import { Request } from "express";

export interface RequestWithUser extends Request {
	user: {
		id: string;
		// Add other user properties as needed
	};
}

export interface AccessTokenPayload {
	iss: string;
	sub: string;
	cid: string;
	scope: string[];
	roles: string[];
	iat: number;
	exp: number;
}

export interface RequestUserData {
	userId: string;
	companyId: string;
}
