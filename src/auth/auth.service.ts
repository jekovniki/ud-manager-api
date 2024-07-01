import { Injectable } from "@nestjs/common";
import { CompaniesService } from "src/companies/companies.service";

@Injectable()
export class AuthService {
	constructor(private readonly companiesService: CompaniesService) {}
	public async signInLocal() {}
	public async logout() {}
	public async refreshTokens() {}
}
