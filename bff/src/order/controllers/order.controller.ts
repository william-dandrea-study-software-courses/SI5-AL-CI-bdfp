import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOkResponse, ApiParam} from "@nestjs/swagger";
import {TableDetails} from "../../table-resume/schemas/table-details.schema";
import {OrderService} from "../services/order.service";
import {CustomerOrderDto} from "../dto/customer-order.dto";

@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) {}

    @ApiParam({ name: 'tableOrderId' })
    @ApiOkResponse({ type: TableDetails, isArray: true, description: "All the updated informations about the tables in the room"})
    @Post(':tableOrderId/create')
    public async makeOrder(@Param('tableOrderId') tableOrderId: string, @Body() customerOrderDto: CustomerOrderDto[]): Promise<any> {
        return this.orderService.createOrder(tableOrderId, customerOrderDto)
    }
}
