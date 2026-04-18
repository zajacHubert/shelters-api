import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { NeedStatus } from '../enums/need-status.enum';

export class CreateNeedDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  purchaseLink?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @IsEnum(NeedStatus)
  status: NeedStatus;

  @IsNotEmpty()
  @IsUUID()
  shelterId: string;
}
