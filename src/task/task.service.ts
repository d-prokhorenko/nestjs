import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger('TaskService');

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.log('CRON executes every 30 seconds...');
  }

  @Interval(1000)
  handleInterval() {
    this.logger.log('INTERVAL executes every 1 second...');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.log('TIMEOUT executes after 5 seconds after start...');
  }
}
