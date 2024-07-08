export class CreateUserDto {
	company_id: string;
	email: string;
	role_id: number;
}

export class CompleteUserRegistration {
	refreshToken: string;
	firstName: string;
	lastName: string;
	position: string;
	password: string;
	email: string;
}
