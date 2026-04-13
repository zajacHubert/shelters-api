import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { NeedStatus } from '../enums/need-status.enum';

export class FilterNeedsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(NeedStatus)
  status?: NeedStatus;

  /** Filtrowanie po tytule potrzeby (LIKE, case-insensitive) */
  @IsOptional()
  @IsString()
  title?: string;

  /** Filtrowanie po nazwie schroniska (LIKE, case-insensitive) */
  @IsOptional()
  @IsString()
  shelterName?: string;
}
