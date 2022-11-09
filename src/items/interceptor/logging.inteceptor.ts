import {
  Injectable,
  Logger,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { RequestService } from '../request.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterCeptor implements NestInterceptor {
  private readonly logger = new Logger();
  constructor(private readonly requestService: RequestService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, url } = request;

    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${
        context.getHandler().name
      } ...before`,
    );

    this.logger.debug('userId', this.requestService.getUserId());

    const before = Date.now();

    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength}-${userAgent} ${ip}: ${
            Date.now() - before
          }ms ...after`,
        );
        // this.logger.debug('Response', res);
      }),
    );
  }
}
