import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CompaniesModule } from "./features/companies/companies.module";
import { AuthModule } from "./features/auth/auth.module";
import { UsersModule } from "./features/users/users.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { PermissionsModule } from "./features/permissions/permissions.module";
import { RolesModule } from "./features/roles/roles.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CompaniesModule,
		AuthModule,
		UsersModule,
		ConfigurationModule,
		PermissionsModule,
		RolesModule,
	],
})
export class AppModule {}
