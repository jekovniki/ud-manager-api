import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { FundService } from "./fund.service";
import { CreateFundDto } from "./dto/create-fund.dto";
import { UpdateFundDto } from "./dto/update-fund.dto";
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
	create(@Body() createFundDto: CreateFundDto) {
		return this.fundService.create(createFundDto);
	}

	@Get(":id")
	get(@Param("id") id: string, @User() user: RequestUserData) {
		return this.fundService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateFundDto: UpdateFundDto) {
		return this.fundService.update(+id, updateFundDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.fundService.remove(+id);
	}
}
