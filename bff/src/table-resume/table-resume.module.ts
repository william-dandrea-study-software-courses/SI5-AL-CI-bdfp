import { Module } from '@nestjs/common';
import { TableResumeController } from './controllers/table-resume.controller';
import { TableResumeService } from './services/table-resume.service';

@Module({
  controllers: [TableResumeController],
  providers: [TableResumeService]
})
export class TableResumeModule {}
