import {Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {TableDetails} from "../schemas/table-details.schema";
import {TableResumeService} from "../services/table-resume.service";
import {GetTableNumberParams} from "../params/get-table-number.params";
import {TableServerDto} from "../../shared/dto/table-server.dto";

@ApiTags('table-resume')
@Controller('/table-resume')
export class TableResumeController {
    constructor(private readonly tableResumeService: TableResumeService) {}

    @ApiOkResponse({ type: TableDetails, isArray: true })
    @Get()
    public async listAllTables(): Promise<TableServerDto[]> {
        return this.tableResumeService.listTables();
    }

    @ApiParam({ name: 'tableNumber' })
    @Post(':tableNumber/pay-bill')
    public async payBill(@Param() getTableNumberParams: GetTableNumberParams): Promise<boolean> {
        return true;
    }
}
