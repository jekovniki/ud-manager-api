import { Injectable } from "@nestjs/common";
import { CompleteUserRegistration, CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { EntityManager } from "typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly entityManager: EntityManager,
	) {}

	public async create(createUserDto: CreateUserDto) {
		const user = new User(createUserDto);
		return this.entityManager.save(user);
	}

	public async completeRegistration(
		id: string,
		user: CompleteUserRegistration,
	) {}

	public findAll() {
		return `This action returns all users`;
	}

	public findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	public update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	public remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
