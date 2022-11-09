import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
export class createItemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly name: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly qty: number;
}
