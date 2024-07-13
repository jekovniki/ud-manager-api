import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super(); // here you pass the object for the config strategy (here not needed)
	}

	async validate(email: string, password: string): Promise<any> {
		const user = await this.authService.validateUser(email, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
