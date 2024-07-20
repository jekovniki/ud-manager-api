import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.stategy";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
	controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule.register({ defaultStrategy: "local" }),
		JwtModule.register({}),
	],
	providers: [
		AuthService,
		UserService,
		LocalStrategy,
		AccessTokenStrategy,
		RefreshTokenStrategy,
	],
})
export class AuthModule {}
