import { Module } from "@nestjs/common";
import { ObligationService } from "./obligation.service";
import { ObligationController } from "./obligation.controller";
import { Obligation } from "./entities/obligation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Obligation])],
	controllers: [ObligationController],
	providers: [ObligationService],
})
export class ObligationModule {}
