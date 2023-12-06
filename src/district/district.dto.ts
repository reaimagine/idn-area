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

export class District {
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  @ApiProperty({ description: 'The district code', example: '110101' })
  code: string;

  @IsNotEmpty()
  @IsNotSymbol("'()-./")
  @Length(3, 255)
  @ApiProperty({ description: 'The district name', example: 'Bakongan' })
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  @ApiProperty({
    description: 'The regency code of the district',
    example: '1101',
  })
  regencyCode: string;
}

export class DistrictSortQuery extends SortQuery {
  @EqualsAny(['code', 'name'])
  declare readonly sortBy?: 'code' | 'name';
}

export class DistrictFindQueries extends IntersectionType(
  PartialType(PickType(District, ['name', 'regencyCode'] as const)),
  DistrictSortQuery,
  PaginationQuery,
) {}

export class DistrictFindByCodeParams extends PickType(District, [
  'code',
] as const) {}
