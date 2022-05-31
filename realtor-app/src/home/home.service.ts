import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dtos/home.dto';
import type {
  CreateHomeParams,
  HomeWhereInput,
  UpdateHomeParams,
} from 'src/type';

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHomes(filter: HomeWhereInput): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      select: {
        id: true,
        address: true,
        numberOfBedrooms: true,
        numberOfBathrooms: true,
        city: true,
        listedDate: true,
        price: true,
        landSize: true,
        propertyType: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: filter,
    });

    if (!homes.length) {
      throw new NotFoundException();
    }

    return homes.map((home) => new HomeResponseDto(home));
  }

  async getHomeById(id: number): Promise<HomeResponseDto> {
    const home = await this.prismaService.home.findUnique({
      select: {
        id: true,
        address: true,
        numberOfBedrooms: true,
        numberOfBathrooms: true,
        city: true,
        listedDate: true,
        price: true,
        landSize: true,
        propertyType: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: {
        id,
      },
    });

    if (!home) {
      throw new NotFoundException();
    }

    return new HomeResponseDto(home);
  }
  async createHome({
    address,
    numberOfBathrooms,
    numberOfBedrooms,
    city,
    landSize,
    price,
    propertyType,
    images,
  }: CreateHomeParams) {
    const home = await this.prismaService.home.create({
      data: {
        address,
        numberOfBathrooms,
        numberOfBedrooms,
        city,
        landSize,
        price,
        propertyType,
        realtorId: 3,
      },
    });
    console.log(home);
    const homeImages = images.map((image) => {
      return {
        ...image,
        homeId: home.id,
      };
    });

    await this.prismaService.image.createMany({ data: homeImages });

    if (!home) {
      throw new NotFoundException();
    }
    console.log(new HomeResponseDto(home));
    return new HomeResponseDto(home);
  }

  async updateHomeById(data: UpdateHomeParams, id: number) {
    const home = await this.prismaService.home.findUnique({ where: { id } });
    if (!home) {
      throw new NotFoundException();
    }

    const updatedHome = await this.prismaService.home.update({
      where: { id },
      data,
    });

    return new HomeResponseDto(updatedHome);
  }

  async deleteHomeById(id: number) {
    await this.prismaService.image.deleteMany({ where: { homeId: id } });
    await this.prismaService.home.delete({ where: { id } });
  }
}
