import { Test, TestingModule } from '@nestjs/testing';
import { VoyageRequestController } from './voyage-request.controller';

describe('VoyageRequestController', () => {
  let controller: VoyageRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoyageRequestController],
    }).compile();

    controller = module.get<VoyageRequestController>(VoyageRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
