import { Injectable } from '@nestjs/common';
import { MappedReportLiteralType, data } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dto';
import { v4 as uuid } from 'uuid';

type ReportDataType = {
  amount: number;
  source: string;
};

type UpdateReportDataType = Partial<ReportDataType>;

@Injectable()
export class ReportService {
  getAllReports(type: MappedReportLiteralType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: MappedReportLiteralType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(
    type: MappedReportLiteralType,
    { amount, source }: ReportDataType,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: MappedReportLiteralType,
    id: string,
    body: UpdateReportDataType,
  ): ReportResponseDto {
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
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);

    return;
  }
}
