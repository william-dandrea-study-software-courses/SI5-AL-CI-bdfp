import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import {KitchenServerService} from "../shared/services/kitchen/kitchen-server.service";
import {DiningServerService} from "../shared/services/dining/dining-server.service";
import {MenuServerService} from "../shared/services/menu/menu-server.service";
import {HttpModule} from "@nestjs/axios";
import {TableResumeService} from "../table-resume/services/table-resume.service";

@Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [OrderService, TableResumeService, KitchenServerService, DiningServerService, MenuServerService]
})
export class OrderModule {}
