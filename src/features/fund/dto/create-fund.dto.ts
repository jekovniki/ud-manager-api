import { IsString, IsUUID, IsBoolean, IsOptional } from "class-validator";

export class CreateFundDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	bullstat: string;

	@IsUUID()
	companyId: string;

	@IsBoolean()
	@IsOptional()
	active?: boolean;
}
