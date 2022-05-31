import { NestInterceptor } from '@nestjs/common';
import type { ExecutionContext, CallHandler } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  intercept = (context: ExecutionContext, handler: CallHandler) => {
    console.log('リクエスト');
    // console.log('context === ', context);
    // console.log('handler === ', handler);
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split('Bearer ')[1];
    console.log({ token });
    const user = jwt.decode(token);
    request.user = user;

    console.log({ user });
    return handler.handle();
  };
}
