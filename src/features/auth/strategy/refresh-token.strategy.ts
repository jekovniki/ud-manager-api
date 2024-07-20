import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"refresh",
) {
	constructor(configServicce: ConfigService) {
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
	}

	public validate(req: Request, payload: any) {
		// console.log("req.cookie inside", req.cookies);
		// console.log("RefreshTokenStrategy refreshToken :", refreshToken);
		return {
			payload,
			refreshToken: "",
		};
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
