import { Test, TestingModule } from '@nestjs/testing';
import { VoyageRequestService } from './voyage-request.service';

describe('VoyageRequestService', () => {
  let service: VoyageRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoyageRequestService],
    }).compile();

    service = module.get<VoyageRequestService>(VoyageRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
