import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/api/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { RequestWithUser } from "./interface/requestWithUser.interface";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.getUserByEmail(registerDto.email);
    if (user) throw new HttpException('Email exist', HttpStatus.BAD_REQUEST);
    try {
      const pass = await this.hashPassword(registerDto.password);
      const creatUser = await this.userService.createUser({
        ...registerDto,
        password: pass,
      });
      creatUser.password = undefined;
      return creatUser;
    } catch (error) {
      return error.message;
    }
  }

  async logIn(request) {
    try {
      const { email } = request;
      const checkActive = await this.checkEmailActive(email);
      return this.getCookieWithJwtAccessToken(checkActive);
    } catch (error) {
      return error.message;
    }
  }

  async LogOut(response: RequestWithUser) {
    response.res.setHeader('Set-Cookie', this.getCookieForLogOut());
    return response.statusCode;
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const auth = await this.userService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, auth.password);
      return auth;
    } catch (error) {
      return error.message;
    }
  }

  async getCookieWithJwtAccessToken(user: any) {
    const { id, email, name } = user;
    const payload = { id, email, name };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
    });
    return `Authentication=${token}`;
  }

  private getCookieForLogOut() {
    return `Authentication=`;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching)
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
  }

  private async hashPassword(pass: string) {
    return await bcrypt.hash(pass, 10);
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
  async confirmEmail(email) {
    const user = await this.userService.getUserByEmail(email);
    if (user.isStatus) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  async checkEmailActive(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user.isStatus)
      throw new HttpException(
        'Account is not active,Please check your email again',
        HttpStatus.BAD_REQUEST,
      );
    delete user.password;
    return user;
  }

  async createWithGoogle(data) {
    if (!data.user) {
      throw new BadRequestException();
    }
    const { email } = data.user;
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      return this.logIn(user);
    }
    try {
      const newUser = await this.userService.createWithGoogle(data.user);
      return this.logIn(newUser);
    } catch (error) {
      return error.message;
    }
  }

  async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    if (payload.userId) {
      return this.userService.getUserById(payload.userId);
    }
  }
}
