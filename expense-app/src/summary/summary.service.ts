import { Injectable } from '@nestjs/common';
import { MappedReport } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary = () => {
    const totalExpense = this.reportService
      .getAllReports(MappedReport.expense)
      .reduce((sum, report) => sum + report.amount, 0);
    const totalIncome = this.reportService
      .getAllReports(MappedReport.income)
      .reduce((sum, report) => sum + report.amount, 0);
    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  };
}
