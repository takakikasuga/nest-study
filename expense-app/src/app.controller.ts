// NOTE: Controllerの責務はエンドポイントを作成すること。

import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    return data.report.filter((report) => {
      report.type === reportType;
    });
  }

  @Get(':id')
  getReportById() {
    return {};
  }

  @Post()
  createReport() {
    return 'Created';
  }

  @Put(':id')
  updateReport() {
    return 'Updated';
  }

  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
