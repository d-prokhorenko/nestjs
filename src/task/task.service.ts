import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    console.log('CRON executes every 30 seconds...');
  }

  @Interval(1000)
  handleInterval() {
    console.log('INTERVAL executes every 1 second...');
  }

  @Timeout(5000)
  handleTimeout() {
    console.log('TIMEOUT executes after 5 seconds after start...');
  }
}
