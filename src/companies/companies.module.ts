import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesController } from "./companies.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";
import { Roles } from "src/core/roles/entities/roles.entity";
import { RolesService } from "src/core/roles/roles.service";

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
