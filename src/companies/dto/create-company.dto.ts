import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsPositive, ValidateNested } from "class-validator";

export class CreateCompanyEmployeesDto {
	@ApiProperty({ example: "user@example.com", required: true })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 1, required: true })
	@IsPositive()
	roleId: number;
}

export class CreateCompanyDto {
	@ApiProperty({
		example: "Example Asset Management Company",
		required: true,
	})
	name: string;

	@ApiProperty({
		example: "123432423",
		required: true,
	})
	uic: string;

	@ApiProperty({ type: [CreateCompanyEmployeesDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateCompanyEmployeesDto)
	employees: CreateCompanyEmployeesDto[];
}
