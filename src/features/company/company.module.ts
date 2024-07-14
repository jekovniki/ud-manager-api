import { Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { UserService } from "src/features/user/user.service";
import { User } from "src/features/user/entities/user.entity";
import { Role } from "src/features/role/entities/role.entity";
import { RoleService } from "src/features/role/role.service";
import { FileManagerService } from "src/configuration/file-manager/file-manager.service";
import { EmailService } from "src/configuration/email/email.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		TypeOrmModule.forFeature([Company]),
		TypeOrmModule.forFeature([User]),
		TypeOrmModule.forFeature([Role]),
		JwtModule.register({}),
	],
	controllers: [CompanyController],
	providers: [
		CompanyService,
		UserService,
		RoleService,
		FileManagerService,
		EmailService,
	],
})
export class CompanyModule {}
