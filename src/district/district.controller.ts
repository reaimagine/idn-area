import { ApiDataResponse } from '@/common/decorator/api-data-response.decorator.js';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  District,
  DistrictFindByCodeParams,
  DistrictFindQueries,
} from './district.dto.js';
import { DistrictService } from './district.service.js';
import { ApiPaginatedResponse } from '@/common/decorator/api-paginated-response.decorator.js';
import { PaginatedReturn } from '@/common/interceptor/paginate.interceptor.js';

@ApiTags('District')
@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ description: 'Get the districts.' })
  @ApiQuery({
    name: 'sortBy',
    description: 'Sort by district code or name.',
    required: false,
    type: 'string',
    example: 'code',
  })
  @ApiPaginatedResponse({
    model: District,
    description: 'Returns array of district.',
  })
  @ApiBadRequestResponse({ description: 'If there are invalid query values.' })
  @Get()
  async find(
    @Query() queries?: DistrictFindQueries,
  ): Promise<PaginatedReturn<District>> {
    return this.districtService.find(queries);
  }

  @ApiOperation({ description: 'Get a district by its code.' })
  @ApiDataResponse({ model: District, description: 'Returns a district.' })
  @ApiBadRequestResponse({ description: 'If the `code` is invalid.' })
  @ApiNotFoundResponse({
    description: 'If no district matches the `code`.',
  })
  @Get(':code')
  async findByCode(
    @Param() { code }: DistrictFindByCodeParams,
  ): Promise<District> {
    const district = await this.districtService.findByCode(code);

    if (district === null) {
      throw new NotFoundException(`There are no district with code '${code}'`);
    }

    return district;
  }
}
