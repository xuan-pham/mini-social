import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string;

    // @IsArray()
    // images?: string[];

}