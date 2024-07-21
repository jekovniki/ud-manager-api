import { Test, TestingModule } from '@nestjs/testing';
import { ObligationController } from './obligation.controller';
import { ObligationService } from './obligation.service';

describe('ObligationController', () => {
  let controller: ObligationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObligationController],
      providers: [ObligationService],
    }).compile();

    controller = module.get<ObligationController>(ObligationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
