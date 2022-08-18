/* eslint-disable prettier/prettier */
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreaterUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}