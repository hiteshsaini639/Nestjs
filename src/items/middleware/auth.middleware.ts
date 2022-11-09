import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { RequestService } from '../request.service';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(AuthenticationMiddleware.name);
    const userId = '123';
    this.requestService.setUserId(userId);
    next();
  }
}
