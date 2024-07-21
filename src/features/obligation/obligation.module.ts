import { Module } from '@nestjs/common';
import { ObligationService } from './obligation.service';
import { ObligationController } from './obligation.controller';

@Module({
  controllers: [ObligationController],
  providers: [ObligationService],
})
export class ObligationModule {}
