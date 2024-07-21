import { IsString, IsUUID, IsEnum, IsOptional, IsDateString } from "class-validator";
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

	@IsDateString()
	dueDate: string;
}
