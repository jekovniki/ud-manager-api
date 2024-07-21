import { IsString, IsUUID, IsEnum, IsDate, IsOptional } from "class-validator";
import { ObligationStatus } from "../utils/enum.utils";

export class CreateObligationDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsUUID()
	@IsOptional()
	fundId?: string;

	@IsUUID()
	companyId: string;

	@IsEnum(ObligationStatus)
	status: ObligationStatus;

	@IsDate()
	dueDate: Date;
}
