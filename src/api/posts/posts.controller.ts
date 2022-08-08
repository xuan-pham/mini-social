import { Body, Controller, Delete, Res, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/index';
import JwtAuthenticationGuard from '../../share/auth/guards/jwt.guard';
import { PostsService } from './posts.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '../../config/image/imageProfile.config';
import { storagePost } from '../../config/image/imagePost.config';



@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get()
    index() {
        return this.postService.getAllPost()
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('create')
    @UseInterceptors(FilesInterceptor('images', 12, storagePost))
    create(@Req() request, @Body() post: CreatePostDto, @UploadedFiles() images: Array<Express.Multer.File>) {
        const id = request.user.id
        return this.postService.createPost(+id, post, images);
    }
    @UseGuards(JwtAuthenticationGuard)
    @Put('update/:id')
    @UseInterceptors(FilesInterceptor('files', 12, storagePost))
    update(@Param('id') id, @Body() post: UpdatePostDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        return this.postService.updatePost(+id, post, files);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.postService.deletePost(id)
    }

    // @Post('test')
    // @UseInterceptors(FilesInterceptor('files', 4, storagePost))
    // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    //     // for (let i = 0; i < files.length; i++) {
    //     //     console.log(files[i].filename);
    //     // }
    //     const a = files.map(({ filename }) => {
    //         console.log(filename);
    //     })

    //     return files;
    // }

    @UseGuards(JwtAuthenticationGuard)
    @Get(':id')
    getAll(@Param('id') id: number) {
        return this.postService.getPostById(id)
    }
}
