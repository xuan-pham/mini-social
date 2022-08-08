import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { Comment } from './shemas/comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,

        private usersService: UsersService,
        private postsService: PostsService

    ) { }

    async create(postId, request, data) {
        try {

            const post = await this.postsService.getPostById(Number(postId));
            const user = await this.usersService.getUserById(request.body.id);
            const comment = await this.commentRepository.create({
                ...data,
                post,
                author: user
            });
            await this.commentRepository.save(comment);
            return comment;

        } catch (error) {
            return error.message;
        }

    }

    async showByPost(id: number, page: number = 1) {
        const comments = await this.commentRepository.find({
            where: { post: { id } },
            relations: ['author', 'post'],
            take: 25,
            skip: 25 * (page - 1),
        });
        return comments;
    }

    async showByUser(userId, page: number = 1) {
        const comments = await this.commentRepository.find({
            where: { author: { id: userId } },
            relations: ['author', 'post'],
            take: 25,
            skip: 25 * (page - 1)
        });
        return comments;
    }

    async show(id) {
        const comments = await this.commentRepository.findOne({
            where: { id },
            relations: ['author', 'post']
        });
        return comments;
    }

    async delete(id, request) {
        const userId = request.user.id;
        const comments = await this.commentRepository.findOne({
            where: { id },
            relations: ['author', 'post']
        });

        if (comments.author.id !== userId) throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED);
        await this.commentRepository.remove(comments);
        return comments;
    }
}
