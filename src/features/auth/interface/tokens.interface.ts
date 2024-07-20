export interface AccessTokenPayload {
	iss: string;
	sub: string;
	cid: string;
	scope: string[];
	role: string;
	iat: number;
	exp: number;
}

export interface RefreshTokenPayload {
	iss: string;
	sub: string;
	cid: string;
}
