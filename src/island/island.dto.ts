import { SortQuery } from '@/sort/sort.dto.js';
import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { EqualsAny } from '../common/decorator/EqualsAny.js';
import { IsNotSymbol } from '../common/decorator/IsNotSymbol.js';
import { PaginationQuery } from '@/common/dto/pagination.dto.js';

export class Island {
  @IsNotEmpty()
  @IsNumberString()
  @Length(9, 9)
  @ApiProperty({ description: 'The island code', example: '110140001' })
  code: string;

  @IsNotEmpty()
  @IsString()
  @Length(30, 30)
  @ApiProperty({ example: `03°19'03.44" N 097°07'41.73" E` })
  coordinate: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty({ example: false })
  isOutermostSmall: boolean;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty({ example: false })
  isPopulated: boolean;

  @IsNotEmpty()
  @IsNotSymbol("'-/")
  @Length(3, 255)
  @ApiProperty({
    description: 'The island name',
    example: 'Pulau Batukapal',
  })
  name: string;

  @ValidateIf((o) => o.regencyCode)
  @IsOptional()
  @IsNumberString()
  @Length(4, 4)
  @ApiProperty({
    description: `The regency code of the island.
      Providing an empty string will filter islands that are not part of any regency.`,
    example: '1101',
  })
  regencyCode?: string;

  @ApiProperty({ example: 3.317622222222222 })
  latitude?: number;

  @ApiProperty({ example: 97.12825833333332 })
  longitude?: number;
}

export class IslandSortQuery extends SortQuery {
  @EqualsAny(['code', 'name', 'coordinate'])
  declare readonly sortBy?: 'code' | 'name' | 'coordinate';
}

export class IslandFindQueries extends IntersectionType(
  PartialType(PickType(Island, ['name', 'regencyCode'] as const)),
  IslandSortQuery,
  PaginationQuery,
) {}

export class IslandFindByCodeParams extends PickType(Island, [
  'code',
] as const) {}
