import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    ConfigModule,
    JwtModule.register({})
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule { }
