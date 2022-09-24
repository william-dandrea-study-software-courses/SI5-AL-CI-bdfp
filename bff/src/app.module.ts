import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import appConfig from "./shared/config/app.config";
import swaggeruiConfig from "./shared/config/swaggerui.config";
import {HealthModule} from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, swaggeruiConfig],
    }),
      HealthModule,
  ],
  providers: [],
})
export class AppModule {}
