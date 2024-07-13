import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.stategy";

@Module({
	controllers: [AuthController],
	imports: [TypeOrmModule.forFeature([User]), PassportModule],
	providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}
