import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';

@Controller('google-auth')
export class GoogleAuthController {
    constructor(private readonly googleAuthService: GoogleAuthService) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {

    }

    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.googleAuthService.googleLogin(req);
    }
}
