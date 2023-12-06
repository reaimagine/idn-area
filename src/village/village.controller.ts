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
  Village,
  VillageFindByCodeParams,
  VillageFindQueries,
} from './village.dto.js';
import { VillageService } from './village.service.js';
import { ApiPaginatedResponse } from '@/common/decorator/api-paginated-response.decorator.js';
import { PaginatedReturn } from '@/common/interceptor/paginate.interceptor.js';

@ApiTags('Village')
@Controller('villages')
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @ApiOperation({ description: 'Get the villages.' })
  @ApiQuery({
    name: 'sortBy',
    description: 'Sort by village code or name.',
    required: false,
    type: 'string',
    example: 'code',
  })
  @ApiPaginatedResponse({
    model: Village,
    description: 'Returns array of village.',
  })
  @ApiBadRequestResponse({ description: 'If there are invalid query values.' })
  @Get()
  async find(
    @Query() queries?: VillageFindQueries,
  ): Promise<PaginatedReturn<Village>> {
    return this.villageService.find(queries);
  }

  @ApiOperation({ description: 'Get a village by its code.' })
  @ApiDataResponse({ model: Village, description: 'Returns a village.' })
  @ApiBadRequestResponse({ description: 'If the `code` is invalid.' })
  @ApiNotFoundResponse({
    description: 'If no village matches the `code`.',
  })
  @Get(':code')
  async findByCode(
    @Param() { code }: VillageFindByCodeParams,
  ): Promise<Village> {
    const village = await this.villageService.findByCode(code);

    if (village === null) {
      throw new NotFoundException(`There are no village with code '${code}'`);
    }

    return village;
  }
}
