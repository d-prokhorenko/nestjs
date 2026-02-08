import { Inject, Injectable } from '@nestjs/common';
import { ArtistResponse } from './interfaces/artist.interface';
import { firstValueFrom } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response.interface';
import { HttpService } from '@nestjs/axios';
import {
  type SpotifyOptions,
  SpotifyOptionsSymbol,
} from './interfaces/spotify-options.interface';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private tokenEspiry: number = 0;

  constructor(
    @Inject(SpotifyOptionsSymbol) private options: SpotifyOptions,
    private readonly httpService: HttpService,
  ) {}

  async getArtist(id: string): Promise<ArtistResponse> {
    await this.authenticate();

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        `https://accounts.spotify.com/v1/artists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      ),
    );

    return response.data;
  }

  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() > this.tokenEspiry) {
      return;
    }

    const creds = Buffer.from(
      `${this.options.clientId}:${this.options.clientSecret}`,
    ).toString('base64');

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=cleint_credentials',
        {
          headers: {
            Authorization: `Basic ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    this.accessToken = response.data.access_token;
    this.tokenEspiry = Date.now() + response.data.expires_in * 1000;
  }
}
