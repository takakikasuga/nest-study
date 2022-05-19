// NOTE: Controllerの責務はエンドポイントを作成すること。

import { Controller, Get } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports() {
    return [];
  }

  @Get(':id')
  getAllIncomeReports2() {
    return {};
  }
}
