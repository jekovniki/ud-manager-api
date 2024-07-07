import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesController } from "./companies.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Company]),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [CompaniesController],
	providers: [CompaniesService, UsersService],
})
export class CompaniesModule {}
