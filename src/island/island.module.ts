import { PrismaModule } from '@/prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { IslandController } from './island.controller.js';
import { IslandService } from './island.service.js';

@Module({
  imports: [PrismaModule],
  providers: [IslandService],
  controllers: [IslandController],
  exports: [IslandService],
})
export class IslandModule {}
