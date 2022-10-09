import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {TableDetails} from "../schemas/table-details.schema";
import {TableResumeService} from "../services/table-resume.service";
import {OpenTableDto} from "../dto/open-table.dto";

@ApiTags('table-resume')
@Controller('/table-resume')
export class TableResumeController {
    constructor(private readonly tableResumeService: TableResumeService) {}

    @ApiOkResponse({ type: TableDetails, isArray: true, description: "All the informations about the tables in the room" })
    @Get('/infos')
    public async listAllTables(): Promise<TableDetails[]> {
        return this.tableResumeService.listTables();
    }

    @ApiParam({ name: 'tableNumber' })
    @ApiOkResponse({ type: TableDetails, isArray: true, description: "All the updated informations about the tables in the room"})
    @Post(':tableNumber/open-table')
    public async openTable(@Param('tableNumber') tableNumber: number, @Body() openTableDto: OpenTableDto): Promise<any> {
        return this.tableResumeService.openTable(tableNumber, openTableDto.numberOfPersons);
    }


    @ApiParam({ name: 'tableOrderId' })
    @ApiOkResponse({ type: TableDetails, isArray: true, description: "All the updated informations about the tables in the room"})
    @Post(':tableOrderId/pay-and-close-table')
    public async payAndCLoseTable(@Param('tableOrderId') tableOrderId: string): Promise<any> {
        return this.tableResumeService.payAndCloseTable(tableOrderId);
    }

    @ApiParam({ name: 'preparationId' })
    @ApiOkResponse({ type: TableDetails, isArray: true, description: "All the updated informations about the tables in the room"})
    @Post(':preparationId/served')
    public async servedTable(@Param('preparationId') preparationId: string): Promise<any> {
        return this.tableResumeService.servedTable(preparationId);
    }

}
