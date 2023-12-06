import { EqualsAny } from '@/common/decorator/EqualsAny.js';
import { IsNotSymbol } from '@/common/decorator/IsNotSymbol.js';
import { SortQuery } from '@/sort/sort.dto.js';
import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { PaginationQuery } from '@/common/dto/pagination.dto.js';

export class Province {
  @IsNotEmpty()
  @IsNumberString()
  @Length(2, 2)
  @ApiProperty({ description: 'The province code', example: '11' })
  code: string;

  @IsNotEmpty()
  @IsNotSymbol()
  @Length(3, 255)
  @ApiProperty({ description: 'The province name', example: 'ACEH' })
  name: string;
}

export class ProvinceSortQuery extends SortQuery {
  @EqualsAny(['code', 'name'])
  declare readonly sortBy?: 'code' | 'name';
}

export class ProvinceFindQueries extends IntersectionType(
  PartialType(PickType(Province, ['name'] as const)),
  ProvinceSortQuery,
  PaginationQuery,
) {}

export class ProvinceFindByCodeParams extends PickType(Province, [
  'code',
] as const) {}
