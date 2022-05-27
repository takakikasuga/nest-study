import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  // NOTE: 他のモジュール群で使用する場合は、exportsを明示的に行う。
  exports: [PrismaService],
})
export class PrismaModule {}
