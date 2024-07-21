import { Test, TestingModule } from '@nestjs/testing';
import { ObligationService } from './obligation.service';

describe('ObligationService', () => {
  let service: ObligationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObligationService],
    }).compile();

    service = module.get<ObligationService>(ObligationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
