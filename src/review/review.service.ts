import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Review[]> {
    return this.prismaService.review.findMany();
  }

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    const review = this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });

    return review;
  }
}
