import { EqualsAny } from '@/common/decorator/EqualsAny.js';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SortOptions } from './sort.service.js';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * The validator class for the sort query.
 *
 * You may need to inherit this class and use `@EqualsAny()` decorator
 * for `sortBy` property to accept only specific values.
 */
export class SortQuery<
  T extends Record<string, unknown> = Record<string, unknown>,
> implements SortOptions<T>
{
  @IsOptional()
  @IsString()
  readonly sortBy?: keyof T;

  @IsOptional()
  @EqualsAny(['asc', 'desc'])
  @ApiPropertyOptional({
    description: 'Sort the data in ascending or descending order.',
  })
  readonly sortOrder?: SortOrder;
}
