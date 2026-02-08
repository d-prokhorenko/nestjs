import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

const artistId = '550e8400-e29b-41d4-a716-446655440001';

const artist = {
  id: artistId,
  name: 'The Weekend',
  genre: 'Pop',
};

const dto = {
  name: 'The Weekend',
  genre: 'Pop',
};

describe('ArtistController', () => {
  let controller: ArtistController;
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([artist]),
            findOne: jest.fn().mockResolvedValue(artist),
            create: jest.fn().mockResolvedValue(artist),
          },
        },
      ],
    }).compile();

    controller = module.get(ArtistController);
    service = module.get(ArtistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([artist]);
  });

  it('should return a single artist by id', async () => {
    const result = await controller.findOne(artistId);
    expect(result).toEqual(artist);
  });

  it('should throw an exception if artist is not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new NotFoundException('Artist not found'));

    try {
      await controller.findOne('123456');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Artist not found');
    }
  });

  it('should create a new artist', async () => {
    const result = await controller.create(dto);
    expect(result).toEqual(artist);
  });
});
