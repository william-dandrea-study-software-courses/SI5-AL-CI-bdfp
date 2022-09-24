import {Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {TableDetails} from "../schemas/table-details.schema";
import {TableResumeService} from "../services/table-resume.service";
import {GetTableNumberParams} from "../params/get-table-number.params";

@ApiTags('table-resume')
@Controller('/table-resume')
export class TableResumeController {
    constructor(private readonly tableResumeService: TableResumeService) {}

    @ApiOkResponse({ type: TableDetails, isArray: true })
    @Get()
    public async listAllTables(): Promise<TableDetails[]> {
        return this.tableResumeService.listAllTables();
    }

    @ApiParam({ name: 'tableNumber' })
    @Post(':tableNumber/pay-bill')
    public async payBill(@Param() getTableNumberParams: GetTableNumberParams): Promise<boolean> {
        return true;
    }


}
