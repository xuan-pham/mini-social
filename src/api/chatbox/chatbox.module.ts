import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../share/auth/auth.module';
import { ChatboxController } from './chatbox.controller';
import { ChatboxService } from './chatbox.service';
import { ChatGateway } from './gateway/chat.gateway';
import { Message } from './shemas/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthModule],
  controllers: [ChatboxController],
  providers: [ChatboxService, ChatGateway],
})
export class ChatboxModule {}
