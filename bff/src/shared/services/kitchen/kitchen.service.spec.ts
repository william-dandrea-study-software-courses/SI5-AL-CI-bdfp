import { Test, TestingModule } from '@nestjs/testing';
import { KitchenServerService } from './kitchen-server.service';

describe('KitchenService', () => {
  let service: KitchenServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitchenServerService],
    }).compile();

    service = module.get<KitchenServerService>(KitchenServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
