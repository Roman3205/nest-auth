import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async signUp(dto: SignUpDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.db.user.create({
        data: {
          email: dto.email,
          hash,
        },
        omit: {
          hash: true,
        },
      });

      return this.generateToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Credentials taken');
        }
      }
    }
  }

  async login(dto: LoginDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await argon.verify(user.hash, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.generateToken(user.id, user.email);
  }

  async generateToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
