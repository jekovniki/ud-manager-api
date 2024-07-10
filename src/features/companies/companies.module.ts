import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesController } from "./companies.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { UsersService } from "src/features/users/users.service";
import { User } from "src/features/users/entities/user.entity";
import { Roles } from "src/features/roles/entities/roles.entity";
import { RolesService } from "src/features/roles/roles.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Company]),
		TypeOrmModule.forFeature([User]),
		TypeOrmModule.forFeature([Roles]),
	],
	controllers: [CompaniesController],
	providers: [CompaniesService, UsersService, RolesService],
})
export class CompaniesModule {}
