import { Injectable } from '@nestjs/common';
import { TableDetails } from "../schemas/table-details.schema";
import { HttpService } from "@nestjs/axios";
import {TableServerDto} from "../../shared/dto/table-server.dto";
import {BehaviorSubject} from "rxjs";
import {URL_DINING_SERVICE} from "../../config";
import {
    OrderingItemDto,
    OrderingLineDto,
    PreparationDto, PreparedItemDto,
    TableOrderServerDto
} from "../../shared/dto/table-order-server.dto";
import {DiningService} from "../../shared/services/dining/dining.service";

@Injectable()
export class TableResumeService {
    constructor(private readonly httpService: HttpService, private readonly diningService: DiningService) {}


    /**
     *  tableNumber: number;
     *     statusOrder: StatusTableOrder;
     *     isTaken: boolean;
     *     isOrderPaid: boolean;
     *     priceAmount: number | null;
     */

    public listTables(): Promise<TableDetails[]> {

        this.diningService.getTables().then(tables => {
            tables.forEach(table => {
                const tableNumber = table.number;
                const isTaken = table.taken;

                const tableOrderId: string | null = table.tableOrderId;
                if (tableOrderId) {
                    this.diningService.getTableOrder(tableOrderId).then(tableOrder => {
                        const isOrderPaid: boolean = tableOrder.billed != null;

                        // tableOrder.lines.map(line => line.sentForPreparation)

                    })
                }
            })
        })


        return null;
    }


    public getTableInfos(): Promise<TableDetails[]> {
        this.diningService.getTables().then(tables => {

            tables.forEach(table => {
                const tableId: string = table._id;
                const tableNumber: number = table.number;
                const isTableTakenBySomeone: boolean = table.taken;
                const tableOrderId: string | null = table.tableOrderId;

                if (tableOrderId) {
                    // We have an order on this table, we get the infos
                    this.diningService.getTableOrder(tableOrderId).then(tableOrder => {
                        const orderId: string = tableOrder._id;
                        const numberOfCustomerAtTable: number = tableOrder.customersCount;
                        const orderBillDate: Date | null = tableOrder.billed;
                        const orderLines: OrderingLineDto[] = tableOrder.lines;
                        const orderOpenedDate: Date = tableOrder.opened;
                        const orderPreparations: PreparationDto[] = tableOrder.preparations;

                        orderLines.forEach(orderLine => {
                            const orderLineHowMany = orderLine.howMany;
                            const isOrderLineSentToPreparation = orderLine.sentForPreparation;
                            const orderLineItems: OrderingItemDto = orderLine.item;
                            const idOrderLineItemInMenu: string = orderLine.item._id
                            const shortNameOrderLineItem: string = orderLine.item.shortName
                        });

                        orderPreparations.forEach(orderPreparation => {
                            const idOrderPreparation: string = orderPreparation._id;
                            const orderPreparationShouldBeReadyAt: string = orderPreparation.shouldBeReadyAt;
                            const preparedItemsOrderPreparation: PreparedItemDto[] = orderPreparation.preparedItems;

                            preparedItemsOrderPreparation.forEach(preparedItem => {
                                const preparedItemId: string = preparedItem._id;
                                const preparedItemShortName: string = preparedItem.shortName;
                            })
                        })
                    })
                }
            })

        })
        return null;
    }





}
