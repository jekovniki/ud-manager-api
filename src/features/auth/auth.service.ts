import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}
	public async signInLocal() {}
	public async logout() {}
	public async refreshTokens() {}

	public async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findOneByEmail(email);
		if (user && user.password === password) {
			const { email, ...rest } = user;
			return rest;
		}

		return null;
	}
}
