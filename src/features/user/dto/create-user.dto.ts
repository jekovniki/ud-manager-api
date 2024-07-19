import { IsEmail, IsUUID, IsInt, IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@IsUUID()
	@IsNotEmpty()
	companyId: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsInt()
	@IsNotEmpty()
	roleId: number;
}
