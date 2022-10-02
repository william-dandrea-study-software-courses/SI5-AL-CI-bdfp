import { Test, TestingModule } from '@nestjs/testing';
import { DiningService } from './dining.service';

describe('DiningService', () => {
  let service: DiningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiningService],
    }).compile();

    service = module.get<DiningService>(DiningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
