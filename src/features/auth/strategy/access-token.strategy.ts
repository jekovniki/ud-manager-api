import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayload } from "../interface/tokens.interface";
import { RequestUserData } from "src/common/interface/server.interface";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "access") {
	private readonly configService: ConfigService;
	constructor(
		configService: ConfigService,
		private readonly jwtService: JwtService,
	) {
		super({
			jwtFromRequest: (req) => {
				/* most likely there is better way than doing this
				 * @todo : find a solution where i don't parse the cookies here and then in the validate
				 * method as well
				 */
				if (req && req.headers && req.headers.cookie) {
					const cookies = this.parseCookies(req.headers.cookie);
					return cookies["at"];
				}
				return null;
			},
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow("ACCESS_TOKEN_SECRET"),
			passReqToCallback: true,
		});
		this.configService = configService;
	}

	public async validate(req: Request): Promise<RequestUserData> {
		const cookies = req.headers.cookie
			? this.parseCookies(req.headers.cookie)
			: {};

		const token = cookies["at"];

		if (!token) {
			throw new UnauthorizedException("Access token not found");
		}

		try {
			const payload: AccessTokenPayload = await this.jwtService.verifyAsync(
				token,
				{
					secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
				},
			);

			return {
				id: payload.sub,
				companyId: payload.cid,
				permissions: payload.scope,
			};
		} catch (error) {
			throw new UnauthorizedException("Invalid access token");
		}
	}

	private parseCookies(cookieHeader: string): { [key: string]: string } {
		const list: { [key: string]: string } = {};
		cookieHeader.split(";").forEach((cookie) => {
			let [name, ...rest] = cookie.split("=");
			name = name?.trim();
			if (!name) return;
			const value = rest.join("=").trim();
			if (!value) return;
			list[name] = decodeURIComponent(value);
		});
		return list;
	}
}
