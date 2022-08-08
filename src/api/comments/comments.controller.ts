import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { get } from 'http';
import JwtAuthenticationGuard from '../../share/auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) { }

    @UseGuards(JwtAuthenticationGuard)
    @Post('post/:id')
    createComment(@Param('id') post, @Req() request, @Body() data: CommentDto) {
        return this.commentService.create(post, request, data)
    }

    @Get('post/:id')
    showCommentsByPost(@Param('id') post, @Query('page') page: number) {
        return this.commentService.showByPost(post, page)
    }

    @Get('user/:id')
    showCommentsByUser(@Param('id') user: string, @Query('page') page: number) {
        return this.commentService.showByUser(user, page);
    }

    @Get(':id')
    showComment(@Param('id') id: number) {
        return this.commentService.show(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthenticationGuard)
    delete(@Param('id') id: string, @Req() request) {
        return this.commentService.delete(id, request)
    }
}
