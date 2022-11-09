import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ItemDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request = context.getRequest<Request>();
    return request.body ? request.body?.[data] : request.body;
  },
);
