import { PrismaModule } from '@/prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller.js';
import { ProvinceService } from './province.service.js';
import { RegencyModule } from '@/regency/regency.module.js';

@Module({
  imports: [PrismaModule, RegencyModule],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}
