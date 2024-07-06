import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CompaniesModule } from "./companies/companies.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CommonModule } from "./common/common.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CompaniesModule,
		AuthModule,
		UsersModule,
		CommonModule,
	],
})
export class AppModule {}
