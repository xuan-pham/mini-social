import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'the email address of the user',
    example: 'pham.xuan.duc.23.09.2019@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'the name of the user ',
    example: ' Jon Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'the password of the user',
    example: 'Password@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
