import {Controller, Get} from '@nestjs/common';
import {MenuService} from "../services/menu.service";

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}


    @Get('')
    public getAllMenu() {
        return "oui"
    }


}
