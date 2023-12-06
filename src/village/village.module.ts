import { PrismaModule } from '@/prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { VillageController } from './village.controller.js';
import { VillageService } from './village.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [VillageController],
  providers: [VillageService],
  exports: [VillageService],
})
export class VillageModule {}
