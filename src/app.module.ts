import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CompanyModule } from "./features/company/company.module";
import { AuthModule } from "./features/auth/auth.module";
import { UserModule } from "./features/user/user.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { PermissionModule } from "./features/permission/permission.module";
import { RoleModule } from "./features/role/role.module";
import { WinstonModule } from "nest-winston";
import { LoggerConfig } from "./configuration/logger/logger.config";
import { CustomLogger } from "./configuration/logger/logger.module";
import { APP_GUARD } from "@nestjs/core";
import { PermissionGuard } from "./common/guard/permission.guard";
import { AccessGuard } from "./common/guard/access.guard";
import { FundModule } from "./features/fund/fund.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		WinstonModule.forRoot(
			new LoggerConfig()
				.console({ level: "info" })
				.file({ filename: "log/error.log", level: "error" })
				.file({ filename: "log/combined.log" })
				.getConfig(),
		),
		CompanyModule,
		AuthModule,
		UserModule,
		ConfigurationModule,
		PermissionModule,
		RoleModule,
		FundModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PermissionGuard,
		},
		CustomLogger,
	],
})
export class AppModule {}
