import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/local/signin")
	public async signInLocal() {
		await this.authService.signInLocal();
	}

	@Post("/logout")
	public async logout() {
		await this.authService.logout();
	}

	@Post("/refresh")
	public async refreshTokens() {
		await this.authService.refreshTokens();
	}
}
