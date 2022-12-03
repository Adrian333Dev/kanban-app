import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    request.user = user;
    return next.handle();
  }
}
