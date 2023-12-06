import { PrismaModule } from '@/prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller.js';
import { DistrictService } from './district.service.js';
import { VillageModule } from '@/village/village.module.js';

@Module({
  imports: [PrismaModule, VillageModule],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService],
})
export class DistrictModule {}
