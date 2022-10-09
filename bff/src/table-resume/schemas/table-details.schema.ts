export class TableDetails {
    tableNumber: number;
    statusOrder: StatusTableOrder;
    isTaken: boolean;
    isOrderPaid: boolean;
    lines: OrderItem[];
    tableOrderId: string | null;
    readyToBeServedPreparationsId: string[];


    constructor(tableNumber: number, statusOrder: StatusTableOrder, isTaken: boolean, isOrderPaid: boolean, lines: OrderItem[], tableOrderId: string | null, readyToBeServedPreparationsId: string[]) {
        this.tableNumber = tableNumber;
        this.statusOrder = statusOrder;
        this.isTaken = isTaken;
        this.isOrderPaid = isOrderPaid;
        this.lines = lines;
        this.tableOrderId = tableOrderId;
        this.readyToBeServedPreparationsId = readyToBeServedPreparationsId;
    }
}

export class OrderItem {
    itemShortName: string;
    howManyItem: number;
    sentToPreparation: boolean;


    constructor(itemShortName: string, howManyItem: number, sentToPreparation: boolean) {
        this.itemShortName = itemShortName;
        this.howManyItem = howManyItem;
        this.sentToPreparation = sentToPreparation;
    }
}

export enum StatusTableOrder {
    ANY_ORDER = "ANY_ORDER",
    ORDER_NOT_SENT_TO_KITCHEN = "ORDER_NOT_SENT_TO_KITCHEN",
    ORDER_SENT_TO_KITCHEN = "ORDER_SENT_TO_KITCHEN",
    ORDER_IN_PROGRESS = "ORDER_IN_PROGRESS",
    ORDER_READY_TO_BE_DELIVERED_TO_TABLE = "ORDER_READY_TO_BE_DELIVERED_TO_TABLE",
}
