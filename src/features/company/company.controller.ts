import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	UseInterceptors,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/features/user/user.service";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Companies")
@Controller({
	path: "companies",
	version: "1",
})
export class CompanyController {
	constructor(
		private readonly companiesService: CompanyService,
		private readonly userService: UserService,
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
	@UseInterceptors(FileInterceptor("logo"))
	@ApiConsumes("multipart/form-data")
	async createLogo() {
		try {
			return true;
		} catch (error) {
			return null;
		}
	}
}
