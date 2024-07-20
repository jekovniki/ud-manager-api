import { Request } from "express";

export interface RequestWithUser extends Request {
	user: RequestUserData;
}

export interface RequestUserData {
	id: string;
	companyId: string;
}
