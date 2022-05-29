import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  // NOTE: Authのモジュール群で他のモジュールを使用する場合は、importsを明示的に行う。
  imports: [PrismaModule],
  controllers: [HomeController],
  providers: [
    HomeService,
    // NOTE: 以下の設定でclass定義に準じたレスポンスが返却されるようになる。
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class HomeModule {}
