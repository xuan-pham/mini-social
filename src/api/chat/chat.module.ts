import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './gateway/chat.gateway';
import { AlertGateway } from './alert/gareway/alert.gateway';
import { AlertController } from './alert/alert.controller';

@Module({
  controllers: [ChatController, AlertController],
  providers: [ChatGateway, AlertGateway],
})
export class ChatModule {}
