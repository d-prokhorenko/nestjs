import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { UAParser } from 'ua-parser-js';
import { lookup } from 'geoip-country';
import { formatName } from '../../common/utils';

@Injectable()
export class StatisticsService {
  private readonly parser: UAParser;

  constructor(private readonly prismaService: PrismaService) {
    this.parser = new UAParser();
  }

  async getBrowserStats(id: string) {
    const clicks = await this.getClicks(id);

    const stats = clicks.reduce((acc, click) => {
      const { browser } = this.getBrowserByUserAgent(click.userAgent);

      if (browser && acc[browser]) {
        acc[browser] += 1;
      } else if (browser) {
        acc[browser] = 1;
      }

      return acc;
    }, {});

    return stats;
  }

  async getContryStats(id: string) {
    const clicks = await this.getClicks(id);

    const stats = clicks.reduce((acc, click) => {
      const { country } = this.getCountryByIp(click.ipAddress);

      if (country && acc[country]) {
        acc[country] += 1;
      } else if (country) {
        acc[country] = 1;
      }

      return acc;
    }, {});

    return stats;
  }

  private async getClicks(linkId: string) {
    const clicks = await this.prismaService.click.findMany({
      where: {
        linkId,
      },
    });

    return clicks;
  }

  private getBrowserByUserAgent(userAgent: string) {
    this.parser.setUA(userAgent);

    const result = this.parser.getResult();

    return { browser: formatName(result.browser.name ?? '') };
  }

  private getCountryByIp(ip: string) {
    const geo = lookup(ip);

    console.log(JSON.stringify(geo));

    return {
      // ts-ignore
      country: formatName(geo?.name),
    };
  }
}
