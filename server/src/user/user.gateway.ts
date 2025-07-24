import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('UserGateway connect', client.id);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('UserGateway disconnect', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log('UserGateway', client, payload);
    return 'Hello world!';
  }
}
