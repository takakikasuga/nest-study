// NOTE: Controllerの責務はエンドポイントを作成すること。

import { Controller, Get } from '@nestjs/common';

@Controller('report/income')
export class AppController {
  @Get()
  getAllIncomeReports() {
    return [];
  }

  @Get()
  getAllIncomeReports2() {
    return {};
  }
}
