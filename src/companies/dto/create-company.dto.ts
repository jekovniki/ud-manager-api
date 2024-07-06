import { ApiProperty } from "@nestjs/swagger";

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

	employees: Array<{ email: string; roleId: number }>;
}
