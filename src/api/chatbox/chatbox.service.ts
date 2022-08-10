import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '../../share/auth/auth.service';
import { parse } from 'cookie';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './shemas/message.entity';
import { Repository } from 'typeorm';
import { User } from '../users/shemas/user.entity';
@Injectable()
export class ChatboxService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        private readonly authService: AuthService,
    ) { }

    async getUserFromSocket(socket: Socket) {
        const cookie = socket.handshake.headers.cookie;
        const { Auth: authenticationToken } = parse(cookie);
        const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    }

    async saveMessage(content: string, author) {
        const newMessage = await this.messageRepository.create({
            content,
            author
        })
        await this.messageRepository.save(newMessage);
        return newMessage;
    }

    async getAllMessages() {
        return this.messageRepository.find({
            relations: ['author']
        })
    }
}
