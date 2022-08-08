import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationTokenPayload } from './interface/verificationTokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,) { }

    async sendUserConfirmation(email: string) {
        const payload: VerificationTokenPayload = { email };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}`
        });
        const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Mini-Social! Confirm your Email',
            html: `Welcome to the application. To confirm the email address, <a href="${url}">click here</a>`
        });

    }
}
