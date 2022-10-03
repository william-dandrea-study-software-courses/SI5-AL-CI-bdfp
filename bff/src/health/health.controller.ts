import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService, HealthIndicator, HttpHealthIndicator, MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  @HealthCheck()
  check() {
    return {
      status: 'up'
    };
  }
}
