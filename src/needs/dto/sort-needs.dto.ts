import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export enum NeedSortBy {
  STATUS = 'status',
  TITLE = 'title',
  SHELTER_NAME = 'shelterName',
  CREATED_AT = 'createdAt',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortNeedsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(NeedSortBy)
  sortBy?: NeedSortBy = NeedSortBy.CREATED_AT;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
