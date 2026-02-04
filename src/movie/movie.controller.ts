import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MovieResponse } from './dto/movie-response.dto';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get Movies',
    description: 'Get All Movies',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get Movie',
    description: 'Get Movie By Id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the Movie',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie found',
    type: MovieResponse,
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
    example: {
      status: 404,
      message: 'Movie not found',
      timestamp: '2026-02-04',
      path: '/mvoie/123',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({ summary: 'Create Movie' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: {
  //         type: 'string',
  //         example: 'Movie Title',
  //       },
  //     },
  //   },
  // })
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
