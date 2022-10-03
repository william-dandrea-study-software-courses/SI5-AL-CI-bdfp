import { Test, TestingModule } from '@nestjs/testing';
import { TableResumeController } from './table-resume.controller';

describe('TableResumeController', () => {
  let controller: TableResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableResumeController],
    }).compile();

    controller = module.get<TableResumeController>(TableResumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
