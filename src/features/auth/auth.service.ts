import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { hashData, validateHash } from "./utils/hash.utils";
import { ConfigService } from "@nestjs/config";
import { AuthDto, CompleteUserRegistration } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { Permission } from "../permission/entities/permission.entity";
import { User } from "../user/entities/user.entity";

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
			throw new BadRequestException("Wrong credentials");
		}
		if (!user.password) {
			throw new BadRequestException("Please complete registration before you try to sign in");
		}

		const isValidPassword = await validateHash(credentials.password, user.password);
		if (!isValidPassword) {
			throw new BadRequestException("Wrong credentials");
		}

		const permissions = user.role.permissions.map((permission) => `${permission.feature}:${permission.permission}`);
		const tokens = await this.getTokens(user.id, user.company.id, user.role.name, permissions);

		await this.hashAndUpdateRefreshToken(user.id, tokens.refreshToken);

		return {
			tokens,
			role: user.role,
		};
	}

	public async signout(userId: string): Promise<void> {
		await this.userService.updateRefreshToken(userId, ""); // invalidates the refresh token
	}

	public async refreshTokens(userId: string, refreshToken: string): Promise<string> {
		const user = await this.userService.findOneById(userId);
		if (!user) {
			throw new BadRequestException("User does not exist");
		}

		const isValidToken = await validateHash(refreshToken, user.refreshToken);
		if (!isValidToken) {
			throw new BadRequestException("Invalid refresh token");
		}
		const userPermissions = this.getUserPermissionsArray(user.role.permissions);
		const accessToken = this.generateAccessToken(user.id, user.company.id, user.role.name, userPermissions);

		return accessToken;
	}

	public async completeUserRegistration(userRegistration: CompleteUserRegistration) {
		const user = await this.verifyRegistrationToken(userRegistration.refreshToken);
		const password = await hashData(userRegistration.password, this.configService);

		return await this.userService.completeRegistration(user.id, {
			...userRegistration,
			password,
		});
	}

	public async verifyRegistrationToken(registrationToken: string): Promise<User> {
		await this.jwtService.verifyAsync(registrationToken, {
			secret: this.configService.getOrThrow("REGISTRATION_TOKEN_SECRET"),
		});

		const user = await this.userService.findUserByToken(registrationToken);
		if (!user) {
			throw new BadRequestException("User is already registered");
		}

		await this.userService.updateRefreshToken(user.id, "");

		return user;
	}

	public async getTokens(
		userId: string,
		companyId: string,
		role: string,
		permissions: string[],
	): Promise<{ accessToken: string; refreshToken: string }> {
		const [accessToken, refreshToken] = await Promise.all([
			this.generateAccessToken(userId, companyId, role, permissions),
			this.generateRefreshToken(userId, companyId),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	public async generateAccessToken(userId: string, companyId: string, role: string, permissions: string[]): Promise<string> {
		return await this.jwtService.signAsync(
			{
				iss: this.configService.getOrThrow("APP_URL"),
				sub: userId,
				cid: companyId,
				scope: permissions,
				role: role,
			},
			{
				expiresIn: 60 * 15, // 15 mins
				secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
			},
		);
	}

	public async generateRefreshToken(userId: string, companyId: string): Promise<string> {
		return await this.jwtService.signAsync(
			{
				iss: this.configService.getOrThrow("APP_URL"),
				sub: userId,
				cid: companyId,
			},
			{
				expiresIn: 60 * 60 * 24 * 7, // 7 days
				secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
			},
		);
	}

	private getUserPermissionsArray(permissions: Permission[]): string[] {
		return permissions.map((permission) => `${permission.feature}:${permission.permission}`);
	}

	/*
	 * @note : original name was: updateRefreshToken
	 * However, I mistaked it for the updateRefreshToken from the this.userService
	 * and i felt this way it will be less problematic when I get back to this
	 * peace of code at some point in the future
	 */
	public async hashAndUpdateRefreshToken(userId: string, refreshToken: string): Promise<string> {
		const hash = await hashData(refreshToken, this.configService);
		await this.userService.updateRefreshToken(userId, hash);

		return hash;
	}
}
