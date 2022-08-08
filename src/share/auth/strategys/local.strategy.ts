import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string) {
        const userExist = await this.authService.getAuthenticatedUser(email, password);
        if (!userExist) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        return userExist;
    }
}