import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './shemas/user.entity';
import { CreaterUserDto } from './dto/index'
import { run } from 'googleapis/build/src/apis/run';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getUserById(id: number) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            // if (!user) throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
            return user;
        } catch (error) {
            return error.message;
        }
    }

    async getUserByEmail(email: string) {
        try {
            const emails = await this.userRepository.findOne({ where: { email } });
            // if (!emails) throw new HttpException('Email not exist', HttpStatus.FORBIDDEN);
            return emails;
        } catch (error) {
            return error.message;
        }

    }

    async createUser(user: CreaterUserDto) {
        try {
            const users = await this.userRepository.save(user);
            return users;

        } catch (error) {
            return error.message;
        }
    }

    async updateInfo(id: number, user, files) {
        try {
            await this.userRepository.update(id, {
                ...user,
                avatar: files.filename
            });
            return;

        } catch (error) {
            return error.message;
        }
    }

    async deleteUser(id: number) {
        try {
            await this.userRepository.delete(id);
            return;
        } catch (error) {
            return error.message;
        }
    }

    async markEmailAsConfirmed(email: string) {
        const user = await this.getUserByEmail(email);
        return this.userRepository.update(user.id, { isStatus: true });
    }

    async createWithGoogle(user) {
        try {
            const newUser = this.userRepository.save({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isStatus: true,
                isRegisteredWithGoogle: true
            });
            return newUser;

        } catch (error) {
            return error.message;
        }
    }

    async getAllInfo(id) {
        try {
            const info = await this.userRepository.find({
                relations: {
                    posts: true
                }, where: { id }
            });
            return info
        } catch (error) {
            return error.message;
        }

    }

}
