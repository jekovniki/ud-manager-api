import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Roles } from "./entities/roles.entity";
import { RolesController } from './roles.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Roles])],
	providers: [RolesService],
	controllers: [RolesController],
})
export class RolesModule {}
