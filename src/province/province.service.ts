import { PaginatedReturn } from '@/common/interceptor/paginate.interceptor.js';
import { getDBProviderFeatures } from '@/common/utils/db/index.js';
import { PrismaService } from '@/prisma/prisma.service.js';
import { SortService } from '@/sort/sort.service.js';
import { Injectable } from '@nestjs/common';
import { Province } from '@prisma/client';
import { ProvinceFindQueries } from './province.dto.js';

@Injectable()
export class ProvinceService {
  readonly sorter: SortService<Province>;

  constructor(private readonly prisma: PrismaService) {
    this.sorter = new SortService<Province>({
      sortBy: 'code',
      sortOrder: 'asc',
    });
  }

  async find(
    options?: ProvinceFindQueries,
  ): Promise<PaginatedReturn<Province>> {
    return this.prisma.paginator({
      model: 'Province',
      args: {
        ...(options?.name && {
          where: {
            name: {
              contains: options.name,
              ...(getDBProviderFeatures()?.filtering?.insensitive && {
                mode: 'insensitive',
              }),
            },
          },
        }),
        ...((options?.sortBy || options?.sortOrder) && {
          orderBy: this.sorter.object({
            sortBy: options?.sortBy,
            sortOrder: options?.sortOrder,
          }),
        }),
      },
      paginate: { limit: options?.limit, page: options?.page },
    });
  }

  async findByCode(code: string): Promise<Province | null> {
    return this.prisma.province.findUnique({
      where: {
        code: code,
      },
    });
  }
}
