import { Module } from '@nestjs/common';
import { BillingController } from './controllers/billing.controller';
import { BillingService } from './services/billing.service';
import {MongooseModule} from "@nestjs/mongoose";
import {HttpModule} from "@nestjs/axios";
import {TableBill, TableBillSchema} from "./schemas/user-bill.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TableBill.name, schema: TableBillSchema }]),
    HttpModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService]
})
export class BillingModule {}
