import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly config: ConfigService,
    private readonly db: DatabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET') as Buffer<ArrayBufferLike> | string,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.db.user.findUnique({
      where: {
        id: payload.sub,
      },
      omit: {
        hash: true,
      },
    });
    return user;
  }
}
