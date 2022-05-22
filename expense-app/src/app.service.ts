import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { data } from './data';
import type { MappedReportLiteralType } from './data';

type ReportDataType = {
  amount: number;
  source: string;
};

type UpdateReportDataType = Partial<ReportDataType>;

@Injectable()
export class AppService {
  getAllReports(type: MappedReportLiteralType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: MappedReportLiteralType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport(
    type: MappedReportLiteralType,
    { amount, source }: ReportDataType,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(
    type: MappedReportLiteralType,
    id: string,
    body: UpdateReportDataType,
  ) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!reportToUpdate) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);

    return;
  }
}
