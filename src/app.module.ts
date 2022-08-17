import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { UsersModule } from './api/users/users.module';
import { PostsModule } from './api/posts/posts.module';
import { AuthModule } from './share/auth/auth.module';
import { MailModule } from './share/mail/mail.module';
import { GoogleAuthModule } from './share/google-auth/google-auth.module';
import { CommentsModule } from './api/comments/comments.module';

import { SearchModule } from './api/search/search.module';
import { MessageModule } from './api/message/message.module';

import * as Joi from '@hapi/joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    AuthModule,
    MailModule,
    GoogleAuthModule,
    CommentsModule,
    SearchModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
