import {Injectable} from '@nestjs/common';
import {OrderItem, StatusTableOrder, TableDetails} from "../schemas/table-details.schema";
import {HttpService} from "@nestjs/axios";
import {
    OrderingItemDto,
    OrderingLineDto,
    PreparationDto,
    PreparedItemDto
} from "../../shared/dto/table-order-server.dto";
import {DiningServerService} from "../../shared/services/dining/dining-server.service";
import {KitchenServerService} from "../../shared/services/kitchen/kitchen-server.service";
import {StatePreparation} from "../../shared/dto/kitchen-server.dto";

@Injectable()
export class TableResumeService {
    constructor(private readonly httpService: HttpService, private readonly diningService: DiningServerService, private readonly kitchenService: KitchenServerService) {}


    /**
     *  tableNumber: number;
     *  statusOrder: StatusTableOrder;
     *  isTaken: boolean;
     *  isOrderPaid: boolean;
     *  priceAmount: number | null;
     */

    public async listTables(): Promise<TableDetails[]> {


        return new Promise<TableDetails[]>(async (resolve, reject) => {
            const tableDetails: TableDetails[] = []

            await this.diningService.getTables().then(async tables => {
                for (const table of tables) {
                    const tableNumber = table.number;
                    const isTaken = table.taken;
                    let statusOrder: StatusTableOrder = StatusTableOrder.ANY_ORDER;
                    const tableOrderId: string | null = table.tableOrderId;
                    let isOrderPaid: boolean = false;
                    let lines: OrderItem[] = []
                    let readyToBeServedPreparationsId: string[] = []



                    if (tableOrderId) {
                        await this.diningService.getTableOrder(tableOrderId).then(async tableOrder => {
                            isOrderPaid = tableOrder.billed != null;

                            lines = tableOrder.lines.map(line => new OrderItem(line.item.shortName, line.howMany, line.sentForPreparation))
                            if (lines.length > 0) {
                                statusOrder = StatusTableOrder.ORDER_SENT_TO_KITCHEN;
                            }
                            if (lines.map(line => line.sentToPreparation).includes(false)) {
                                statusOrder = StatusTableOrder.ORDER_NOT_SENT_TO_KITCHEN;
                            }

                            await this.kitchenService.getPreparations(tableNumber, StatePreparation.PREPARATION_STARTED).then(preparations => {
                                if (preparations.length > 0) {
                                    statusOrder = StatusTableOrder.ORDER_IN_PROGRESS;
                                }
                            }).catch(error => reject(error));

                            await this.kitchenService.getPreparations(tableNumber, StatePreparation.READY_TO_BE_SERVED).then(preparations => {
                                if (preparations.length > 0) {
                                    statusOrder = StatusTableOrder.ORDER_READY_TO_BE_DELIVERED_TO_TABLE
                                    preparations.forEach(prep => {
                                        readyToBeServedPreparationsId.push(prep._id)
                                    })
                                }
                            }).catch(error => reject(error));

                            if (isOrderPaid) {
                                statusOrder = StatusTableOrder.ANY_ORDER
                            }


                        }).catch(error => reject(error));
                    }
                    tableDetails.push(new TableDetails(tableNumber, statusOrder, isTaken, isOrderPaid, lines, tableOrderId, readyToBeServedPreparationsId))
                }
            }).catch(error => reject(error))

            resolve(tableDetails);
        })
    }


    public async openTable(tableNumber: number, numberOfPersons: number): Promise<any> {

        return new Promise(async (resolve, reject) => {
            await this.diningService.postTableOrders(tableNumber, numberOfPersons).then(async () => {
                await this.listTables().then(allTables => resolve(allTables)).catch(error => reject(error))
            }).catch(error => reject(error))
        })

    }

    public async payAndCloseTable(tableOrderId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.diningService.postTableOrderBill(tableOrderId).then(() => {
                this.listTables().then(allTables => {
                    resolve(allTables);
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        });
    }

    public async servedTable(preparationId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.kitchenService.postPreparationTakenToTable(preparationId).then(() => {
                this.listTables().then(allTables => {
                    resolve(allTables);
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        })
    }
}
