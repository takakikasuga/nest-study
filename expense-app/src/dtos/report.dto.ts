import { Exclude, Expose } from 'class-transformer';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import type { MappedReportLiteralType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  type: MappedReportLiteralType;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
