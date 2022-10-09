

export class CustomerOrderDto {
    menuItemId: string;
    howMany: number;
}


export class InnerCustomerOrder {
    menuItemId: string;
    howMany: number;
    menuItemShortName: string;


    constructor(menuItemId: string, howMany: number, menuItemShortName: string) {
        this.menuItemId = menuItemId;
        this.howMany = howMany;
        this.menuItemShortName = menuItemShortName;
    }
}
