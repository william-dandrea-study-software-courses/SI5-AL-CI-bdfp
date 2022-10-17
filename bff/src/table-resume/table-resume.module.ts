import { Module } from '@nestjs/common';
import { TableResumeController } from './controllers/table-resume.controller';
import { TableResumeService } from './services/table-resume.service';
import {HttpModule} from "@nestjs/axios";
import {KitchenServerService} from "../shared/services/kitchen/kitchen-server.service";
import {DiningServerService} from "../shared/services/dining/dining-server.service";
import {MenuServerService} from "../shared/services/menu/menu-server.service";

@Module({

  imports: [HttpModule],
  controllers: [TableResumeController],
  providers: [TableResumeService, KitchenServerService, DiningServerService, MenuServerService]
})
export class TableResumeModule {}
