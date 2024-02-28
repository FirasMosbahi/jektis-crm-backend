import { Test, TestingModule } from '@nestjs/testing';
import { BilletController } from './billet.controller';

describe('BilletController', () => {
  let controller: BilletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BilletController],
    }).compile();

    controller = module.get<BilletController>(BilletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
