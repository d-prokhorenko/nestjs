import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }
}
