import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(configServicce: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configServicce.getOrThrow("REFRESH_TOKEN_SECRET"),
			passReqToCallback: true,
		});
	}

	public validate(req: Request, payload: any) {
		const refreshToken = req.get("authorization").replace("Bearer", "").trim();

		return {
			payload,
			refreshToken,
		};
	}
}
