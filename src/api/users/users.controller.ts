import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import JwtAuthenticationGuard from '../../share/auth/guards/jwt.guard';
import { updateUserInterface } from './interface/updateUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../../config/image/imageProfile.config';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  index(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('update')
  @UseInterceptors(FileInterceptor('files', storage))
  update(
    @Req() request,
    @Body() user: updateUserInterface,
    @UploadedFile() files: Express.Multer.File,
  ) {
    const id = request.user.id;
    return this.userService.updateInfo(+id, user, files);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('delete')
  Delete(@Req() request) {
    const id = request.user.id;
    return this.userService.deleteUser(+id);
  }

  //get info user and post by user
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getAll(@Req() request) {
    const id = request.user.id;
    return this.userService.getAllInfo(+id);
  }
}
