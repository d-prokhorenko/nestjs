import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { IS_DEV_ENV } from '../utils';

export const UserAgent = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request.headers['user-agent'];
  },
);

export const ClientIp = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    // 83.220.239.255
    const ip = IS_DEV_ENV
      ? '63.116.61.253'
      : Array.isArray(request.headers['cf-connection-ip'])
        ? request.headers['cf-connection-ip'][0]
        : (request.headers['cf-connection-ip'] ??
          (typeof request.header['x-forwarded-for'] === 'string'
            ? request.header['x-forwarded-for'].split(',')[0]
            : request.ip));

    return ip;
  },
);
