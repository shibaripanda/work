// import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    // private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // afterInit(server: Server) {
  //   const corsOrigin = (this.configService.get<string>('CORS_ORIGIN') || '')
  //     .split(',')
  //     .map((origin) => origin.trim())
  //     .filter(Boolean);

  //   // Настраиваем CORS для socket.io
  //   server.engine.opts.cors = {
  //     origin: corsOrigin,
  //     credentials: true,
  //   };
  //   server.use((socket: Socket, next) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     const rawToken = socket.handshake.auth?.token;

  //     if (!rawToken || typeof rawToken !== 'string') {
  //       return next(new UnauthorizedException('unauthorized'));
  //     }

  //     const token = rawToken.startsWith('Bearer ')
  //       ? rawToken.split(' ')[1]
  //       : rawToken;

  //     this.jwtService
  //       .verifyAsync(token)
  //       .then((payload) => {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //         socket.data.user = payload;
  //         next();
  //       })
  //       .catch((err) => {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //         if (err.name === 'TokenExpiredError') {
  //           next(new UnauthorizedException('token_expired'));
  //         } else {
  //           next(new UnauthorizedException('unauthorized'));
  //         }
  //       });
  //   });
  // }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnect: ', client.id);
  }
}
