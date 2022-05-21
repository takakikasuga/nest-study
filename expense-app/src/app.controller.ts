// NOTE: Controllerの責務はエンドポイントを作成すること。

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { MappedReport } from './data';
import { AppService } from './app.service';
import type { MappedReportLiteralType } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
  ) {
    console.log('type === ', type);
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    console.table({ type, id });
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Body() body: { amount: number; source: string },
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
  ) {
    console.table({ type, ...body });
    return this.appService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { amount: number; source: string },
  ) {
    console.table({ id, ...body, type });
    return this.appService.updateReport(type, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
