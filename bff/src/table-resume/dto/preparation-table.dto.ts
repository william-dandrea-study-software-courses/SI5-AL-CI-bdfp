

export enum StatusPreparationTable {
    READY_TO_BE_SERVED="READY_TO_BE_SERVED",
    SERVED="SERVED",
    IN_PROGRESS="IN_PROGRESS",
}

export class ItemTableDto {
    id: string;
    short_name: string;


    constructor(id: string, short_name: string) {
        this.id = id;
        this.short_name = short_name;
    }
}

export class PreparationTableDto {
    preparation_id: string;
    status: StatusPreparationTable;
    items: ItemTableDto[];


    constructor(preparation_id: string, status: StatusPreparationTable, items: ItemTableDto[]) {
        this.preparation_id = preparation_id;
        this.status = status;
        this.items = items;
    }
}
