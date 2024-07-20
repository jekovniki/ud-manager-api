import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseInterceptors,
	UploadedFile,
	BadRequestException,
	Put,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { Public } from "src/common/decorator/public.decorator";
import { Permission } from "src/common/decorator/permission.decorator";
import { User } from "src/common/decorator/user.decorator";
import { RequestUserData } from "src/common/interface/server.interface";

@ApiTags("Company")
@Controller({
	path: "company",
	version: "1",
})
export class CompanyController {
	constructor(private readonly companiesService: CompanyService) {}

	@Post()
	@Public()
	public async create(@Body() createCompanyDto: CreateCompanyDto) {
		return this.companiesService.create(createCompanyDto);
	}

	@Post("/user")
	@Permission("user:CREATE")
	public async addUser(@Body() createUserDto: CreateUserDto) {
		return this.companiesService.addUserToCompany(
			createUserDto.companyId,
			createUserDto,
		);
	}

	@Get("/my")
	@Permission("company:READ")
	public async getCompany(@User() user: RequestUserData) {
		return this.companiesService.findOne(user.companyId);
	}

	@Get("my/user")
	@Permission("company:READ")
	public async getAllCompanyUsers(@User() user: RequestUserData) {
		return this.companiesService.getAllUsers(user.companyId);
	}

	/**
	 * @todo : finish this. only name is updated rn.
	 */
	@Put("/my")
	@Permission("company:UPDATE")
	public async update(
		@User() user: RequestUserData,
		@Body() updateCompanyDto: UpdateCompanyDto,
	) {
		return this.companiesService.update(user.companyId, updateCompanyDto);
	}

	/**
	 * @todo : complete this method and implement the upload thing s3
	 */
	@Public()
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
		if (!logo) {
			throw new BadRequestException("Logo file is required");
		}
		return this.companiesService.saveLogo(id, logo);
	}
}
