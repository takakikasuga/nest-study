import { PropertyType } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';

export class HomeResponseDto {
  id: number;
  address: string;

  // NOTE: スネークケースからキャメルケースに変更する方法
  // @Exclude()
  numberOfBedrooms: number;

  // @Expose({ name: 'number_of_bedrooms' })
  // number_of_bedrooms() {
  //   return this.numberOfBedrooms;
  // }

  // @Exclude()
  numberOfBathrooms: number;

  // @Expose({ name: 'number_of_bathrooms' })
  // number_of_bathrooms() {
  //   return this.numberOfBathrooms;
  // }
  city: string;
  listedDate: Date;
  price: number;
  landSize: number;
  propertyType: PropertyType;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updateAt: Date;

  @Exclude()
  realtorId: number;

  image: string;

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}

class Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateHomeResponseDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  numberOfBedrooms: number;

  @IsNumber()
  @IsPositive()
  numberOfBathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  landSize: number;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];
}
