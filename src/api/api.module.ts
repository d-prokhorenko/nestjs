import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [LinkModule, StatisticsModule],
})
export class ApiModule {}
