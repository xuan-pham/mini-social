import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './dto/index'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }

    async getAllPost() {
        const posts = await this.postRepository.find();
        return posts;
    }

    async getPostById(id: number) {
        const posts = await this.postRepository.findOne({ where: { id } })
        return posts;
    }

    async createPost(id, post: CreatePostDto, images: any) {
        console.log(images);
        try {
            const nameFiles = images.map(({ filename }) => {
                return filename;
            }, []);
            const posts = await this.postRepository.create({
                ...post,
                author: id,
                images: nameFiles
            });
            await this.postRepository.save(posts)
            return posts;

        } catch (error) {
            return error.message;
        }

    }

    async updatePost(id: number, post: UpdatePostDto, files: any) {
        try {
            const nameFiles = files.map(({ filename }) => {
                return filename;
            })
            await this.postRepository.update(id, {
                ...post,
                images: nameFiles
            });
            return;
        } catch (error) {
            return error.message;
        }

    }

    async deletePost(id: number) {
        try {
            await this.postRepository.delete(id);
            return;
        } catch (error) {
            return error.message;
        }

    }
}
