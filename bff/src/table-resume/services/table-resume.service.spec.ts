import { Test, TestingModule } from '@nestjs/testing';
import { TableResumeService } from './table-resume.service';

describe('TableResumeService', () => {
  let service: TableResumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableResumeService],
    }).compile();

    service = module.get<TableResumeService>(TableResumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
