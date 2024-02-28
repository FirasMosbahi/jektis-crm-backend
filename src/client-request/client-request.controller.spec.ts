import { Test, TestingModule } from '@nestjs/testing';
import { ClientRequestController } from './client-request.controller';

describe('ClientRequestController', () => {
  let controller: ClientRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientRequestController],
    }).compile();

    controller = module.get<ClientRequestController>(ClientRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
