/* eslint-disable prettier/prettier */
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    const config = new DocumentBuilder()
        .setTitle('mini social')
        .setDescription('The mini social API description')
        .setVersion('1.0')
        .addTag('minisocial')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000, () => {
        console.log(`App is running http://localhost:3000`);
    });
}

bootstrap().then();
