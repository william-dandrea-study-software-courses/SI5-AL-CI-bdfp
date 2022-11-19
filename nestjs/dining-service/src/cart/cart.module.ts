import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TableCart, TableCartSchema} from "./schemas/table-cart.schema";
import { KitchenProxyService } from './services/kitchen-proxy.service';
import { MenuProxyService } from './services/menu-proxy.service';
import {TableOrdersModule} from "../table-orders/table-orders.module";
import {HttpModule} from "@nestjs/axios";
import {BillingModule} from "../billing/billing.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: TableCart.name, schema: TableCartSchema }]),
      HttpModule,
      TableOrdersModule,
      BillingModule
  ],
  controllers: [CartController],
  providers: [CartService, KitchenProxyService, MenuProxyService],
  exports: [CartService]
})
export class CartModule {}
