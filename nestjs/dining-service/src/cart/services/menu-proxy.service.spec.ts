import { Test, TestingModule } from '@nestjs/testing';
import { MenuProxyService } from './menu-proxy.service';

describe('MenuProxyService', () => {
  let service: MenuProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuProxyService],
    }).compile();

    service = module.get<MenuProxyService>(MenuProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
