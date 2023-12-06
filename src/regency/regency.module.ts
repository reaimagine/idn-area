import { Module } from '@nestjs/common';
import { IslandModule } from '../island/island.module.js';
import { RegencyController } from './regency.controller.js';
import { RegencyService } from './regency.service.js';
import { PrismaModule } from '@/prisma/prisma.module.js';
import { DistrictModule } from '@/district/district.module.js';

@Module({
  imports: [PrismaModule, DistrictModule, IslandModule],
  controllers: [RegencyController],
  providers: [RegencyService],
  exports: [RegencyService],
})
export class RegencyModule {}
