import {
	Body,
	Controller,
	Param,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthenticatedGuard } from "./authenticated.guard";
import { AuthDto, CompleteUserRegistration } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { dot } from "node:test/reporters";

@ApiTags("Authentication & Authorization")
@Controller({
	path: "auth",
	version: "1",
})
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/sign-up/local")
	@ApiBody({ type: CompleteUserRegistration })
	public async signUpLocal(@Body() userRegistration: CompleteUserRegistration) {
		return this.authService.completeUserRegistration(userRegistration);
	}

	@Post("/sign-in/local")
	public async signInLocal(@Body() dto: AuthDto) {
		await this.authService.signInLocal();
		return dto;
	}

	@Post("/sign-out")
	public async signout(userId: string): Promise<void> {
		await this.authService.signout(userId);
		return;
	}

	@UseGuards(AuthenticatedGuard)
	@Post("/refresh")
	public async refreshTokens() {
		await this.authService.refreshTokens();
		return true;
	}
}
