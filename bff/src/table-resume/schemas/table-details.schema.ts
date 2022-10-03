export class TableDetails {
    tableNumber: number;
    statusOrder: StatusTableOrder;
    isTaken: boolean;
    isOrderPaid: boolean;
    priceAmount: number | null;
}

export enum StatusTableOrder {
    ANY_ORDER = "ANY_ORDER",
    ORDER_GIVEN_TO_KITCHEN = "ORDER_GIVEN_TO_KITCHEN",
    ORDER_IN_PROGRESS = "ORDER_IN_PROGRESS",
    ORDER_READY_TO_BE_DELIVERED_TO_TABLE = "ORDER_READY_TO_BE_DELIVERED_TO_TABLE",
    ORDER_DELIVERED_TO_TABLE = "ORDER_DELIVERED_TO_TABLE",
}
