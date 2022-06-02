import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import type { ExecutionContext } from '@nestjs/common';
import type { JWTPayloadType } from 'src/type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('roles in AuthGuard', roles);
    if (roles?.length) {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization?.split('Bearer ')[1];
      console.log('token in AuthGuard', token);
      try {
        const payload = jwt.verify(
          token,
          process.env.JSON_TOKEN_KEY,
        ) as JWTPayloadType;
        const user = await this.prismaService.user.findUnique({
          where: {
            id: payload.id,
          },
        });

        if (!user) {
          return false;
        }

        if (roles.includes(user.userType)) {
          return true;
        }
        console.log('user in AuthGuard === ', user);

        return false;
      } catch (error) {
        console.log('error === ', error);
        return false;
      }
    }
    console.log(roles);
    return true;
  }
}
