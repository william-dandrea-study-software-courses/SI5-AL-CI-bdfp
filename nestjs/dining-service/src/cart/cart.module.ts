import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TableCart, TableCartSchema} from "./schemas/table-cart.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: TableCart.name, schema: TableCartSchema }]),],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
