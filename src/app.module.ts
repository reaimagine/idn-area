import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { AppController } from './app.controller.js';
import { DistrictModule } from './district/district.module.js';
import { IslandModule } from './island/island.module.js';
import { ProvinceModule } from './province/province.module.js';
import { RegencyModule } from './regency/regency.module.js';
import { VillageModule } from './village/village.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProvinceModule,
    RegencyModule,
    DistrictModule,
    VillageModule,
    IslandModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: seconds(config.get('APP_THROTTLE_TTL')),
          limit: config.get('APP_THROTTLE_LIMIT'),
          skipIf: () => config.get('APP_ENABLE_THROTTLE') !== 'true',
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
