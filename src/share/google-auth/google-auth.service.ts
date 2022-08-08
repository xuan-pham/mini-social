import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GoogleAuthService {
    constructor(private readonly authService: AuthService) { }
    async googleLogin(req) {
        return this.authService.createWithGoogle(req);
    }
}
