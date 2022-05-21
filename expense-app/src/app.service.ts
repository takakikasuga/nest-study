import { Injectable } from '@nestjs/common';

import { data } from './data';
import type { MappedReportLiteralType } from './data';

@Injectable()
export class AppService {
  getAllReports(type: MappedReportLiteralType) {
    return data.report.filter((report) => report.type === type);
  }
}
