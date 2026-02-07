import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interface';
import { UnitAnyCase } from 'ms';
import type { Request, Response } from 'express';
import { isDev } from '../utils/is-dev.util';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: `${number}${UnitAnyCase}`;
  private readonly JWT_REFRESH_TOKEN_TTL: `${number}${UnitAnyCase}`;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL =
      configService.getOrThrow<`${number}${UnitAnyCase}`>(
        'JWT_ACCESS_TOKEN_TTL',
      );
    this.JWT_REFRESH_TOKEN_TTL =
      configService.getOrThrow<`${number}${UnitAnyCase}`>(
        'JWT_REFRESH_TOKEN_TTL',
      );

    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIES_DOMAIN');
  }

  async register(res: Response, input: RegisterInput) {
    const { name, email, password } = input;

    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, input: LoginInput) {
    const { email, password } = input;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new NotFoundException();
    }

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response) {
    const refershToken: string = req.cookies['refreshToken'];

    if (!refershToken) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refershToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return this.auth(res, user.id);
    }
  }

  async logout(res: Response) {
    this.setCookies(res, 'refreshToken', new Date(0));

    return true;
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookies(res, refreshToken, new Date(Date.now() + 60 * 60 * 24 * 7));

    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookies(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'lax' : 'lax',
    });
  }
}
