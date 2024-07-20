import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { hashData, validateHash } from "../../utils";
import { ConfigService } from "@nestjs/config";
import { AuthDto, CompleteUserRegistration } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}
	public async signInLocal(credentials: AuthDto) {
		const user = await this.userService.findOneByEmail(credentials.email);
		if (!user) {
			throw new BadRequestException("Грешно име или парола");
		}
		if (!user.password) {
			throw new BadRequestException(
				"Моля завършете регистрацията си, преди да се впишете. Би следвало да сте получили имейл на вашата електронна поща.",
			);
		}

		const isValidPassword = await validateHash(
			credentials.password,
			user.password,
		);
		if (!isValidPassword) {
			throw new BadRequestException("Грешно име или парола");
		}

		const permissions = user.role.permissions.map(
			(permission) => `${permission.feature}:${permission.permission}`,
		);
		const tokens = await this.getTokens(
			user.id,
			user.company.id,
			[user.role.name],
			permissions,
		);

		this.userService.updateRefreshToken(user.id, tokens.refreshToken);

		return {
			tokens,
			role: user.role,
		};
	}
	public async signout(userId: string): Promise<void> {
		await this.userService.updateRefreshToken(userId, ""); // invalidates the refresh token
	}
	public async refreshTokens() {}

	public async completeUserRegistration(
		userRegistration: CompleteUserRegistration,
	) {
		await this.verifyRegistrationToken(
			userRegistration.userId,
			userRegistration.companyId,
			userRegistration.refreshToken,
		);
		const password = await hashData(
			userRegistration.password,
			this.configService,
		);

		return await this.userService.completeRegistration(
			userRegistration.userId,
			{
				...userRegistration,
				password,
			},
		);
	}

	public async verifyRegistrationToken(
		userId: string,
		companyId: string,
		registrationToken: string,
	) {
		const payload = await this.jwtService.verifyAsync(registrationToken, {
			secret: this.configService.getOrThrow("REGISTRATION_TOKEN_SECRET"),
		});

		if (payload.sub !== userId || payload.cid !== companyId) {
			throw new BadRequestException("Използваният ключ не е за този профил");
		}

		const storedToken =
			await this.userService.findUserByToken(registrationToken);
		if (!storedToken) {
			throw new BadRequestException("Потребителят вече е регистриран");
		}

		await this.userService.updateRefreshToken(userId, "");
	}

	public async getTokens(
		userId: string,
		companyId: string,
		role: string[],
		permissions: string[],
	): Promise<{ accessToken: string; refreshToken: string }> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					iss: this.configService.getOrThrow("APP_URL"),
					sub: userId,
					cid: companyId,
					scope: permissions,
					roles: role,
				},
				{
					expiresIn: 60 * 15, // 15 mins
					secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
				},
			),
			this.jwtService.signAsync(
				{
					iss: this.configService.getOrThrow("APP_URL"),
					sub: userId,
					cid: companyId,
				},
				{
					expiresIn: 60 * 60 * 24 * 7, // 7 days
					secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
				},
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	public async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findOneByEmail(email);
		if (user && user.password === password) {
			const { email, ...rest } = user;
			return rest;
		}

		return null;
	}

	public async updateRefreshToken(
		userId: string,
		refreshToken: string,
	): Promise<string> {
		const hash = await hashData(refreshToken, this.configService);
		await this.userService.updateRefreshToken(userId, hash);

		return hash;
	}
}
