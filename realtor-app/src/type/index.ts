// NOTE: https://stackoverflow.com/questions/68208946/prisma-findmany-input-type
import { Prisma, PropertyType } from '@prisma/client';

export type HomeWhereInput = Prisma.HomeWhereInput;
export type CreateHomeParams = {
  address: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  city: string;
  price: number;
  landSize: number;
  propertyType: PropertyType;
  images: { url: string }[];
};
