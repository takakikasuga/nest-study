import { NestInterceptor } from '@nestjs/common';
import type { ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept = (context: ExecutionContext, handler: CallHandler) => {
    console.log('リクエスト');
    console.log(context);
    console.log(handler);
    return handler.handle().pipe(
      map((data) => {
        console.log('レスポンス');
        console.log(data);
        const response = {
          ...data,
          createdAt: data.created_at,
        };
        delete response.created_at;
        delete response.updated_at;
        return response;
      }),
    );
  };
}
