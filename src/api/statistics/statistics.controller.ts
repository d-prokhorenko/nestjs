import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Authorization } from '../../common/decorators';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Authorization()
  @Get(':id/browsers')
  async getBrowserStats(@Param('id') id: string) {
    return this.statisticsService.getBrowserStats(id);
  }

  @Authorization()
  @Get(':id/countries')
  async getCountriesStats(@Param('id') id: string) {
    return this.statisticsService.getContryStats(id);
  }
}
