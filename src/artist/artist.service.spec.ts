import { Artist } from '../../prisma/generated/client/client';
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

const artistId = '550e8400-e29b-41d4-a716-446655440001';
const artistId2 = '550e8400-e29b-41d4-a716-446655440002';
const artistId3 = '550e8400-e29b-41d4-a716-446655440003';

const artists: Artist[] = [
  {
    id: artistId,
    name: 'Billie Eilish',
    genre: 'Pop',
  },
  {
    id: artistId2,
    name: 'The Weekend',
    genre: 'Pop',
  },
  {
    id: artistId3,
    name: 'Eminem',
    genre: 'rap',
  },
];

const artist: Artist = artists[0];

const dto: ArtistDto = {
  name: artist.name,
  genre: artist.genre,
};

const db = {
  artist: {
    findMany: jest.fn().mockResolvedValue(artists),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('ArtistService', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get(ArtistService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const artists = await service.findAll();
    expect(artists).toEqual(artists);
  });

  it('should return a single artist by ids', async () => {
    expect(service.findOne(artistId)).resolves.toEqual(artist);
  });

  it('should create a new artist', async () => {
    expect(service.create(dto)).resolves.toEqual(artist);
  });
});
