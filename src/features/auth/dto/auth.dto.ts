import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
	MinLength,
} from "class-validator";

export class AuthDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(50)
	password: string;
}

export class CompleteUserRegistration extends AuthDto {
	@IsUUID()
	@IsNotEmpty()
	userId: string;

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
}
