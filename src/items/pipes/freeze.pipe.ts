import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger();
  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log('...pipe tranformation');
    Object.freeze(value);
    return value;
  }
}
