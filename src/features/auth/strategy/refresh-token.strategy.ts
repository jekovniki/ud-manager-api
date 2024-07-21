import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RefreshTokenPayload } from "../dto/tokens.interface";
import { JwtService } from "@nestjs/jwt";
import { RequestRefreshUserToken } from "src/common/interface/server.interface";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh") {
	private readonly configService: ConfigService;

	constructor(
		configServicce: ConfigService,
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
					return cookies["rt"];
				}
				return null;
			},
			ignoreExpiration: false,
			secretOrKey: configServicce.getOrThrow("REFRESH_TOKEN_SECRET"),
			passReqToCallback: true,
		});
		this.configService = configServicce;
	}

	public async validate(req: Request): Promise<RequestRefreshUserToken> {
		const cookies = req.headers.cookie ? this.parseCookies(req.headers.cookie) : {};

		const token = cookies["rt"];

		if (!token) {
			throw new UnauthorizedException("Access token not found");
		}

		try {
			const payload: RefreshTokenPayload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
			});

			return {
				id: payload.sub,
				companyId: payload.cid,
				refreshToken: token,
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
