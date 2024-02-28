import { Test, TestingModule } from '@nestjs/testing';
import { BilletService } from './billet.service';

describe('BilletService', () => {
  let service: BilletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BilletService],
    }).compile();

    service = module.get<BilletService>(BilletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
