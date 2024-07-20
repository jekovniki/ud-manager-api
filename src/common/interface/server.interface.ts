import { Request } from "express";

export interface RequestWithUser extends Request {
	user: RequestUserData;
}

export interface RequestUserData {
	userId: string;
	companyId: string;
}
