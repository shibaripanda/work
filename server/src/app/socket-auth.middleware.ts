import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SocketAuthMiddleware {
  constructor(
    private readonly config: ConfigService,
    private jwt: JwtService,
  ) {
    console.log('AppService initialized');
  }
  use(socket: Socket, next: (err?: any) => void) {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new UnauthorizedException('Token not provided'));
    }

    try {
      const payload = this.jwt.verify(token);
      socket.data.user = payload; // сохраним пользователя в socket.data
      next();
    } catch (err) {
      console.log(err);
      return next(new UnauthorizedException('Invalid token'));
    }
  }
}
