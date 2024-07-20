import { Body, Controller, Post, Request, Response } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthDto, CompleteUserRegistration } from "./dto/auth.dto";
import { RequestWithUser } from "../../common/interface/server.interface";
import { Public } from "src/common/decorators/public.decorator";

@ApiTags("Authentication & Authorization")
@Controller({
	path: "auth",
	version: "1",
})
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post("/sign-up/local")
	@ApiBody({ type: CompleteUserRegistration })
	public async signUpLocal(@Body() userRegistration: CompleteUserRegistration) {
		return this.authService.completeUserRegistration(userRegistration);
	}

	@Public()
	@Post("/sign-in/local")
	public async signInLocal(@Body() credentials: AuthDto, @Response() response) {
		const { tokens, ...authorization } =
			await this.authService.signInLocal(credentials);

		response.cookie("at", tokens.accessToken, {
			expires: new Date(new Date().getTime() + 60 * 30 * 1000),
			sameSite: "strict",
			httpOnly: true,
		});
		response.cookie("rt", tokens.refreshToken, {
			expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
			sameSite: "strict",
			httpOnly: true,
		});

		return response.send(authorization);
	}

	@Post("/sign-out")
	public async signout(@Request() request: RequestWithUser): Promise<void> {
		console.log(request.user);
		// await this.authService.signout(request.user.id);
		return;
	}

	@Post("/refresh")
	public async refreshTokens() {
		await this.authService.refreshTokens();
		return true;
	}
}
