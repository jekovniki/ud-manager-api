import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	UseInterceptors,
	UploadedFile,
	BadRequestException,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "../user/dto/create-user.dto";

@ApiTags("Company")
@Controller({
	path: "company",
	version: "1",
})
export class CompanyController {
	constructor(private readonly companiesService: CompanyService) {}

	@Post()
	public async create(@Body() createCompanyDto: CreateCompanyDto) {
		try {
			return this.companiesService.create(createCompanyDto);
		} catch (error) {
			return null;
		}
	}

	@Post("/user")
	public async addUser(@Body() createUserDto: CreateUserDto) {
		return this.companiesService.addUserToCompany(
			createUserDto.companyId,
			createUserDto,
		);
	}

	@Get(":id")
	public async getCompany(@Param("id") id: string) {
		return this.companiesService.findOne(id);
	}

	@Get(":id/user")
	public async getAllCompanyUsers(@Param("id") id: string) {
		return this.companiesService.getAllUsers(id);
	}

	@Patch(":id")
	public async update(
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
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				logo: {
					type: "string",
					format: "binary",
				},
			},
		},
	})
	public async createLogo(
		@Param("id") id: string,
		@UploadedFile() logo: Express.Multer.File,
	) {
		try {
			if (!logo) {
				throw new BadRequestException("Logo file is required");
			}
			return this.companiesService.saveLogo(id, logo);
		} catch (error) {
			return null;
		}
	}
}
