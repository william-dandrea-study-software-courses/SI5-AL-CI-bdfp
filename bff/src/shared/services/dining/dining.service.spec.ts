import { Test, TestingModule } from '@nestjs/testing';
import { DiningServerService } from './dining-server.service';

describe('DiningService', () => {
  let service: DiningServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiningServerService],
    }).compile();

    service = module.get<DiningServerService>(DiningServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
