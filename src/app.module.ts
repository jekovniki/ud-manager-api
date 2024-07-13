import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CompanyModule } from "./features/company/company.module";
import { AuthModule } from "./features/auth/auth.module";
import { UserModule } from "./features/user/user.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { PermissionModule } from "./features/permission/permission.module";
import { RoleModule } from "./features/role/role.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CompanyModule,
		AuthModule,
		UserModule,
		ConfigurationModule,
		PermissionModule,
		RoleModule,
	],
})
export class AppModule {}
