import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CompanyModule } from "./features/company/company.module";
import { AuthModule } from "./features/auth/auth.module";
import { UsersModule } from "./features/users/users.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { PermissionModule } from "./features/permission/permission.module";
import { RolesModule } from "./features/roles/roles.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CompanyModule,
		AuthModule,
		UsersModule,
		ConfigurationModule,
		PermissionModule,
		RolesModule,
	],
})
export class AppModule {}
