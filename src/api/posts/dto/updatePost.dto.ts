import { IsArray, IsString } from "class-validator";

export class UpdatePostDto {

    @IsString()
    title: string;

    @IsArray()
    image: string[];

}