import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { AuthService } from "../auth/auth.service";
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_HOST'),
            scope: ['email', 'profile']
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            name: name.givenName + name.familyName,
            avatar: photos[0].value,
            accessToken,
        }
        done(null, user)
    }
}