import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
	constructor() {}
	public async signInLocal() {}
	public async logout() {}
	public async refreshTokens() {}
}
