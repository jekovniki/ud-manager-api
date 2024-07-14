import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { CompleteUserRegistration } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private configService: ConfigService,
	) {}
	public async signInLocal() {}
	public async signout() {}
	public async refreshTokens() {}

	public async completeUserRegistration(
		companyId: string,
		userRegistration: CompleteUserRegistration,
	) {
		return {
			companyId,
			userRegistration,
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
}
