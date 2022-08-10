import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UsersService,
  ) {}

  async findAll(req) {
    const builderPost = await this.postService.queryBuilder('post');
    const builderUser = await this.userService.queryBuilder('user');
    if (req.query.s) {
      builderPost.where('post.title LIKE :s', { s: `%${req.query.s}%` }) ||
        builderUser.where('user.name LIKE :s', { s: `%${req.query.s}%` });
    }
    const post = await builderPost.getMany();
    const user = await builderUser.getMany();
    return { post, user };
  }
}
