import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy]
})
export class GoogleAuthModule { }
