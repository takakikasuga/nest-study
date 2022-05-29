import { PropertyType } from '@prisma/client';
import { Exclude } from 'class-transformer';

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

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}
