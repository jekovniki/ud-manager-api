import { IsEmail, IsUUID, IsInt, IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@IsUUID()
	@IsNotEmpty()
	company_id: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsInt()
	@IsNotEmpty()
	role_id: number;
}
