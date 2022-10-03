


export enum StatePreparation {
    READY_TO_BE_SERVED = "readyToBeServed",
    PREPARATION_STARTED = "preparationStarted",
}

export enum PostEnum {
    BAR = 'BAR',
    COLD_DISH = 'COLD_DISH',
    HOT_DISH = 'HOT_DISH',
}

export class Preparation {
    _id: string;
    tableNumber: number;
    shouldBeReadyAt: Date;
    completedAt: Date;
    takenForServiceAt: Date; // brought to the table
    preparedItems: PreparedItem[];
}

export class PreparedItem {
    _id: string;
    shortName: string;
    recipe: Recipe;
    shouldStartAt: Date;
    startedAt: Date;
    finishedAt: Date;
}

export class Recipe {
    _id: string;
    shortName: string;
    post: PostEnum;
    cookingSteps: string[];
    meanCookingTimeInSec: number;
}

export class PreparationRequest {
    tableNumber: number;
    itemsToBeCooked: ItemToBeCooked[];
}

export class ItemToBeCooked {
    menuItemShortName: string;
    howMany: number;
}
