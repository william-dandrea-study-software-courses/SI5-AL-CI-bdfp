import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {DiningServerService} from "../../shared/services/dining/dining-server.service";
import {KitchenServerService} from "../../shared/services/kitchen/kitchen-server.service";
import {CustomerOrderDto, InnerCustomerOrder } from "../dto/customer-order.dto";
import {TableResumeService} from "../../table-resume/services/table-resume.service";
import {MenuServerService} from "../../shared/services/menu/menu-server.service";

@Injectable()
export class OrderService {
    constructor(private readonly httpService: HttpService, private readonly diningServerService: DiningServerService, private readonly kitchenServerService: KitchenServerService, private readonly tableResumeService: TableResumeService, private readonly  menuServerService: MenuServerService) {}


    public async createOrder(tableOrderId: string, customerOrderDto: CustomerOrderDto[]): Promise<any> {
        return new Promise(async (resolve, reject) => {

            const innerCustomerOrders: InnerCustomerOrder[] = []

            // Verify that all the information in the customerDto are correct
            for (const customerOrder of customerOrderDto) {
                await this.menuServerService.getMenu(customerOrder.menuItemId).then(menu => {
                    innerCustomerOrders.push(new InnerCustomerOrder(customerOrder.menuItemId, customerOrder.howMany, menu.shortName))
                }).catch(error => reject(error))
            }


            // Place all orders
            for (const customerOrder of innerCustomerOrders) {
                await this.diningServerService.postTableOrderItem(tableOrderId, customerOrder.menuItemId, customerOrder.menuItemShortName, customerOrder.howMany).catch(error => {
                    reject(error)
                })
            }

            // Launch the preparation
            this.diningServerService.postTableOrderPrepare(tableOrderId).catch(error => reject(error))

            // List all tables
            this.tableResumeService.listTables().then(allTables => {
                resolve(allTables);
            }).catch(error => reject(error))
        })
    }
}
