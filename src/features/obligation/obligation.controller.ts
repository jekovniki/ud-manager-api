import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { ObligationService } from "./obligation.service";
import { CreateObligationDto } from "./dto/create-obligation.dto";
import { Permission } from "src/common/decorator/permission.decorator";
import { User } from "src/common/decorator/user.decorator";
import { RequestUserData } from "src/common/interface/server.interface";

@Controller("obligation")
export class ObligationController {
	constructor(private readonly obligationService: ObligationService) {}

	@Post()
	@Permission("obligation:CREATE")
	public async create(@Body() createObligationDto: CreateObligationDto) {
		return this.obligationService.create(createObligationDto);
	}

	/**
	 * @note : most likely the get  requests
	 * might be better if they are 1 but with filtering.
	 * Or maybe separate with filtering for incoming or not.
	 *
	 * But then it will be too messy. Don't know :/ .
	 * I need the incoming, because most likely the obligations
	 * will grow a lot.
	 */
	@Get("/company")
	@Permission("obligation:READ")
	public async getAllCompanyObligations(@User() user: RequestUserData) {
		return this.obligationService.findAllCompanyObligations(user.companyId);
	}

	@Get("/company/incoming")
	@Permission("obligation:READ")
	public async getAllIncomingCompanyObligations(@User() user: RequestUserData) {
		return this.obligationService.findAllCompanyObligations(user.companyId);
	}

	@Get("/fund/:fundId")
	@Permission("obligation:READ")
	public async getAllFundObligations(@Param("fundId") fundId: string) {
		return this.obligationService.findAllCompanyObligations(fundId);
	}

	@Get("/fund/:fundId/incoming")
	@Permission("obligation:READ")
	public async getAllIncomingFundObligations(@Param("fundId") fundId: string) {
		return this.obligationService.findAllCompanyObligations(fundId);
	}

	@Get(":id")
	@Permission("obligation:READ")
	public async get(@Param("id") id: string) {
		return this.obligationService.findOneById(id);
	}

	@Delete(":id")
	@Permission("obligation:DELETE")
	public async remove(@Param("id") id: string) {
		return this.obligationService.remove(id);
	}
}
