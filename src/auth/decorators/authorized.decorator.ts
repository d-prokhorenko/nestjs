import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../../prisma/generated/client/client';
import type { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request: Request = ctx.getContext().req;

    const user = request.user;

    return data ? user![data] : user;
  },
);
