import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { CompleteUserRegistration } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}
	public async signInLocal() {}
	public async signout() {}
	public async refreshTokens() {}

	public async completeUserRegistration(
		companyId: string,
		userRegistration: CompleteUserRegistration,
	) {
		await this.verifyRegistrationToken(
			userRegistration.userId,
			companyId,
			userRegistration.refreshToken,
		);
		const password = await this.hashData(userRegistration.password);

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
		const payload = await this.jwtService.verifyAsync(registrationToken);

		console.log("payload", payload);
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
					iss: "",
					sub: userId,
					cid: companyId,
					scope: permissions,
					roles: role,
				},
				{
					expiresIn: 60 * 15,
					secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
				},
			),
			this.jwtService.signAsync(
				{
					iss: "",
					sub: userId,
					cid: companyId,
				},
				{
					expiresIn: 60 * 60 * 24 * 7,
					secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
				},
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	public async hashData(data: string): Promise<string> {
		return bcrypt.hash(
			data,
			Number(this.configService.getOrThrow("SALT_ROUNDS")),
		);
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
		const hash = await this.hashData(refreshToken);
		await this.userService.updateRefreshToken(userId, hash);

		return hash;
	}
}
