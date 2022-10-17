import { Module } from '@nestjs/common';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import {KitchenServerService} from "../shared/services/kitchen/kitchen-server.service";
import {DiningServerService} from "../shared/services/dining/dining-server.service";
import {MenuServerService} from "../shared/services/menu/menu-server.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [MenuController],
  providers: [MenuService, KitchenServerService, DiningServerService, MenuServerService]
})
export class MenuModule {}
