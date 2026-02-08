import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  version: '2',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/artists/:id')
  async getArtist(@Param('id') id: string) {
    return await this.appService.getArtist(id);
  }
}
