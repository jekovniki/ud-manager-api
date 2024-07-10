import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "./entities/roles.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Roles)
		private readonly rolesRepository: Repository<Roles>,
	) {}

	public findAll(): Promise<Roles[]> {
		return this.rolesRepository.find();
	}
}
