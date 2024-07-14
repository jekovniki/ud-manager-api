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

	@Post("/:id/sign-up/local")
	@ApiBody({ type: CompleteUserRegistration })
	public async signUpLocal(
		@Param("id") id: string,
		@Body() userRegistration: CompleteUserRegistration,
	) {
		return this.authService.completeUserRegistration(id, userRegistration);
	}

	@Post("/sign-in/local")
	public async signInLocal(@Body() dto: AuthDto) {
		await this.authService.signInLocal();
		return dto;
	}

	@Post("/sign-out")
	public async signout() {
		await this.authService.signout();
		return true;
	}

	@UseGuards(AuthenticatedGuard)
	@Post("/refresh")
	public async refreshTokens() {
		await this.authService.refreshTokens();
		return true;
	}
}
