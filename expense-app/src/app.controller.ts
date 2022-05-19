// NOTE: Controllerの責務はエンドポイントを作成すること。

import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports() {
    return [];
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
