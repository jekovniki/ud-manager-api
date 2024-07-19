import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { EntityManager, Repository } from "typeorm";
import { CompleteUserRegistration } from "../auth/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Company } from "../company/entities/company.entity";
import { Role } from "../role/entities/role.entity";

interface CreateUserResponse extends User {
	registrationToken: string;
}

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	public async create(
		// no idea why, but if I use userRepository/entity manager from here, this doesn't work, so:
		transactionalEntityManager: EntityManager,
		company: Company,
		role: Role,
		email: string,
	): Promise<CreateUserResponse> {
		const user = await transactionalEntityManager.save(
			new User({
				email,
				company: company,
				role: role,
				password: "",
				firstName: "",
				lastName: "",
				position: "",
				refreshToken: "",
			}),
		);

		// I don't hash the registration token
		const registrationToken = await this.jwtService.signAsync(
			{
				iss: this.configService.getOrThrow("APP_URL"),
				sub: user.id,
				cid: user.company.id,
			},
			{
				expiresIn: "14d",
				secret: this.configService.getOrThrow("REGISTRATION_TOKEN_SECRET"),
			},
		);

		// I store the registration token on the place of refresh token. After first
		// user sign in that token will be removed, and the refreshToken will be hashed
		await transactionalEntityManager.update(
			User,
			{
				id: user.id,
			},
			{
				refreshToken: registrationToken,
			},
		);

		return {
			...user,
			registrationToken,
		};
	}

	public async completeRegistration(
		id: string,
		user: CompleteUserRegistration,
	) {
		this.userRepository.update(
			{
				id,
			},
			{
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				position: user.position,
				updatedAt: new Date(),
			},
		);
	}

	public findOneByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: { email },
		});
	}

	public findUserByToken(refreshToken: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				refreshToken,
			},
		});
	}

	public async updateRefreshToken(userId: string, refreshToken: string) {
		return this.userRepository.update(
			{
				id: userId,
			},
			{
				refreshToken,
			},
		);
	}
}
