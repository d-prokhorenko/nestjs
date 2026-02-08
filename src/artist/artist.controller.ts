import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.artistService.findOne(id);
  }

  @Post()
  async create(@Body() artistDto: ArtistDto) {
    return this.artistService.create(artistDto);
  }
}
