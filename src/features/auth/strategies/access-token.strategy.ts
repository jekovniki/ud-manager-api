import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(configServicce: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configServicce.getOrThrow("ACCESS_TOKEN_SECRET"),
			passReqToCallback: true,
		});
	}

	public validate(req: Request, payload: any) {
		return payload;
	}
}
