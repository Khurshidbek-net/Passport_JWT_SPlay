import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { ResponseFields, Tokens } from '../common/types';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService

  ) { }

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(createUserDto.email)

    if (candidate) {
      throw new BadRequestException("User already exists")
    }

    const newUser = await this.userService.create(createUserDto);
    const response = {
      message: "You have successfully registered",
      userId: newUser.id
    };
    return response;
  }

  async signIn(singInDto: SignInDto, res: Response) {
    const { email, password } = singInDto;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException("Invalid email or password")
    }

    const matchPass = await bcrypt.compare(password, user.hashedPassword);

    if (!matchPass) {
      throw new BadRequestException("User is not active");
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 11);
    const updatedUser = await this.userService.updateRefreshToken(
      user.id,
      hashed_refresh_token
    );

    if (!updatedUser) {
      throw new InternalServerErrorException("Cannot save token")
    }

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 1296000000,
      httpOnly: true
    });

    const response = {
      id: user.id,
      access_token: tokens.access_token
    }

    return response;
  }

  async signOut(userId: number, res: Response) {
    const user = await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedToken: {
          not: null
        },
      },
      data: {
        hashedToken: null
      }
    })

    if (!user)
      throw new ForbiddenException("Access denied")

    res.clearCookie('refresh_token')
    return true;
  }


  async refreshToken(userId: number, refreshToken: string, res: Response): Promise<ResponseFields> {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (userId != decodedToken["id"]) {
      throw new BadRequestException("Not allowed")
    }

    const user = await this.userService.findOne(+userId);

    if (!user || !user.hashedToken) {
      throw new BadRequestException("User not found")
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashedToken
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const tokens = await this.getTokens(user);


    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 11);
    await this.userService.updateRefreshToken(+user.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 1296000000,
      httpOnly: true
    });

    const response = {
      id: user.id,
      access_token: tokens.access_token
    };

    return response;
  }


  async getTokens(user: User): Promise<Tokens> {
    const payload = {
      id: user.id,
      email: user.email
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.access_key,
        expiresIn: process.env.access_time
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.refresh_key,
        expiresIn: process.env.refresh_time
      })
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }


}
