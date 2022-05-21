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
} from '@nestjs/common';
import { MappedReport } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    console.log('type === ', type);
    const reportType =
      type === MappedReport.expense
        ? MappedReport.expense
        : MappedReport.income;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === MappedReport.expense
        ? MappedReport.expense
        : MappedReport.income;
    console.table({ type, id, reportType });
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() body: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    console.table({ type, ...body });
    const reportType =
      type === MappedReport.expense
        ? MappedReport.expense
        : MappedReport.income;
    return this.appService.createReport(reportType, body);
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    console.table({ id, ...body, type });
    const reportType =
      type === MappedReport.expense
        ? MappedReport.expense
        : MappedReport.income;
    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}
