import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto';
import { Authorization, Authorized } from '../../common/decorators';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Authorization()
  @Post()
  async create(
    @Body() createLinkDto: CreateLinkDto,
    @Authorized('id') id: string,
  ) {
    return this.linkService.create(createLinkDto, id);
  }

  @Authorization()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.linkService.delete(id);
  }
}
