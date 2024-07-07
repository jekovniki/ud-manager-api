import { Module } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permissions } from "./entities/permissions.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Permissions])],
	providers: [PermissionsService],
})
export class PermissionsModule {}
