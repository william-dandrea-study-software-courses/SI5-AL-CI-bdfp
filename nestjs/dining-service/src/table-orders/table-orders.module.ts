import {forwardRef, Global, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { TableOrder, TableOrderSchema } from './schemas/table-order.schema';

import { TableOrdersController } from './controllers/table-orders.controller';
import { TableOrdersService } from './services/table-orders.service';
import { MenuProxyService } from './services/menu-proxy.service';
import { KitchenProxyService } from './services/kitchen-proxy.service';

import { TablesModule } from '../tables/tables.module';
import {CartModule} from "../cart/cart.module";
import {CartService} from "../cart/services/cart.service";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TableOrder.name, schema: TableOrderSchema }]),
    HttpModule,
    TablesModule,

  ],
  controllers: [TableOrdersController],
  providers: [
    TableOrdersService,
    MenuProxyService,
    KitchenProxyService,
  ],
  exports: [TableOrdersService]
})
export class TableOrdersModule {}
