import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import appConfig from "./shared/config/app.config";
import swaggeruiConfig from "./shared/config/swaggerui.config";
import {HealthModule} from "./health/health.module";
import { TableResumeModule } from './table-resume/table-resume.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import {HttpModule} from "@nestjs/axios";
import { KitchenServerService } from './shared/services/kitchen/kitchen-server.service';
import { MenuServerService } from './shared/services/menu/menu-server.service';
import { DiningServerService } from './shared/services/dining/dining-server.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, swaggeruiConfig],
    }),
      HealthModule,
      TableResumeModule,
      MenuModule,
      OrderModule,
      HttpModule,
  ],
  providers: [KitchenServerService, MenuServerService, DiningServerService],
})
export class AppModule {}
