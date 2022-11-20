import { Test, TestingModule } from '@nestjs/testing';
import { KitchenProxyService } from './kitchen-proxy.service';

describe('KitchenProxyService', () => {
  let service: KitchenProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitchenProxyService],
    }).compile();

    service = module.get<KitchenProxyService>(KitchenProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
