import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorService } from './actor.service';

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
