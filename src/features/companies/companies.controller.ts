import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/features/users/users.service";

@ApiTags("Companies")
@Controller({
	path: "companies",
	version: "1",
})
export class CompaniesController {
	constructor(
		private readonly companiesService: CompaniesService,
		private readonly userService: UsersService,
	) {}

	@Post()
	async create(@Body() createCompanyDto: CreateCompanyDto) {
		try {
			return this.companiesService.create(createCompanyDto);
		} catch (error) {
			return null;
		}
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		try {
			return this.companiesService.findOne(id);
		} catch (error) {
			return null;
		}
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateCompanyDto: UpdateCompanyDto,
	) {
		try {
			return this.companiesService.update(id, updateCompanyDto);
		} catch (error) {
			return null;
		}
	}

	@Post(":id/logo")
	async createLogo() {
		try {
			return true;
		} catch (error) {
			return null;
		}
	}
}
