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
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { MappedReport, MappedReportLiteralType } from 'src/data';
import {
  ReportResponseDto,
  CreateReportDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
  ): ReportResponseDto[] {
    console.log('type === ', type);
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    console.table({ type, id });
    return this.reportService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
  ): ReportResponseDto {
    console.table({ type, ...body });
    return this.reportService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(MappedReport))
    type: MappedReportLiteralType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    console.table({ id, ...body, type });
    return this.reportService.updateReport(type, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
