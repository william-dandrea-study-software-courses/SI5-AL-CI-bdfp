
export class TableOrderServerDto {
    _id: string;
    tableNumber: number;
    customersCount: number;
    opened: Date;
    lines: OrderingLineDto[];
    preparations: PreparationDto[];
    billed: Date | null;
}

export class PreparationDto {
    _id: string;
    shouldBeReadyAt: string;
    preparedItems: PreparedItemDto[];
}

export class PreparedItemDto {
    _id: string;
    shortName: string;
}

export class OrderingLineDto {
    item: OrderingItemDto;
    howMany: number;
    sentForPreparation: boolean;
}

export class OrderingItemDto {
    _id: string; // id of the item from the menu
    shortName: string;
}
