import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/users/shemas/user.entity';
import { UsersModule } from 'src/api/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategys/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategys/jwt.strategy';
import { MailModule } from '../mail/mail.module';


@Module({
  imports: [
    MailModule,
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.register({}),

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,],
  exports: [AuthService]
})
export class AuthModule { }
