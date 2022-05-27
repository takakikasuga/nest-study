import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * @note NestJSのライフサイクルイベント(onModuleInit)
   * @docs https://docs.nestjs.com/fundamentals/lifecycle-events
   */
  async onModuleInit() {
    await this.$connect;
  }

  async onModuleDestroy() {
    console.log('onModuleDestroy');
    await this.$disconnect;
  }
}
