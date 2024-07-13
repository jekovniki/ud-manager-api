import {
	IsString,
	IsEmail,
	IsUUID,
	IsInt,
	IsNotEmpty,
	MinLength,
	MaxLength,
} from "class-validator";

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

export class CompleteUserRegistration {
	@IsString()
	@IsNotEmpty()
	refreshToken: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	lastName: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	position: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(50)
	password: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;
}
