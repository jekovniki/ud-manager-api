import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	BadRequestException,
} from "@nestjs/common";
import { FundService } from "./fund.service";
import { CreateFundDto } from "./dto/create-fund.dto";
import { ApiTags } from "@nestjs/swagger";
import { Permission } from "src/common/decorator/permission.decorator";
import { User } from "src/common/decorator/user.decorator";
import { RequestUserData } from "src/common/interface/server.interface";

@ApiTags("Fund")
@Controller({
	path: "fund",
	version: "1",
})
export class FundController {
	constructor(private readonly fundService: FundService) {}

	@Post()
	@Permission("fund:CREATE")
	create(@User() user: RequestUserData, @Body() createFundDto: CreateFundDto) {
		if (createFundDto.companyId !== user.companyId) {
			throw new BadRequestException("You don't have access to this company");
		}

		return this.fundService.create(createFundDto);
	}

	@Get(":id")
	@Permission("fund:READ")
	get(@Param("id") id: string) {
		return this.fundService.findOne(id);
	}

	@Get("my/company")
	@Permission("fund:READ")
	getCompanyFunds(@User() user: RequestUserData) {
		return this.fundService.findAllCompanyFunds(user.companyId);
	}

	@Delete(":id")
	@Permission("fund:DELETE")
	public async remove(@Param("id") id: string) {
		await this.fundService.remove(id);
		return;
	}
}
