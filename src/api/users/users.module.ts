import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './shemas/user.entity';
import { JwtStrategy } from 'src/share/auth/strategys/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/share/auth/strategys/local.strategy';
import { AuthService } from 'src/share/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, LocalStrategy, AuthService],
  exports: [UsersService],
})
export class UsersModule { }
