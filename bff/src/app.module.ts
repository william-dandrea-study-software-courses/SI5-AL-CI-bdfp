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
  providers: [],
})
export class AppModule {}
