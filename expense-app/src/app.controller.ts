// NOTE: Controllerの責務はエンドポイントを作成すること。

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data, MappedReport } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    console.log('type === ', type);
    const reportType =
      type === MappedReport.expense
        ? MappedReport.expense
        : MappedReport.income;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === MappedReport.expense
        ? MappedReport.expense
        : MappedReport.income;
    console.table({ type, id, reportType });
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    console.table({ amount, source, type });
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type:
        type === MappedReport.expense
          ? MappedReport.expense
          : MappedReport.income,
    };
    data.report.push(newReport);
    return newReport;
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

    const reportToUpdate = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!reportToUpdate) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };
    return data.report[reportIndex];
  }

  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
