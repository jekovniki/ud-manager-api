export interface AccessTokenPayload {
	iss: string;
	sub: string;
	cid: string;
	scope: string[];
	roles: string[];
	iat: number;
	exp: number;
}
