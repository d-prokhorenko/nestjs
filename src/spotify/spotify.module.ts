import { Global, Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule.register({})],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
