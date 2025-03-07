import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { AdminAuthService } from './admin-auth.service';
import { CreateUserDto } from '../user/dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { GetCurrentUserId } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { JwtPayloadWithRefreshToken, ResponseFields } from '../common/types';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Post('signup')
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.userAuthService.signUp(createUserDto);
  }

  @Post('signup/admin')
  async signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminAuthService.signUp(createAdminDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signInUser(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userAuthService.signIn(signInDto, res)
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin/admin")
  async signInAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.signIn(signInDto, res)
  }


  @HttpCode(200)
  @Post("signout")
  singout(@GetCurrentUserId() userId: number, @Res({ passthrough: true }) res: Response): Promise<boolean> {
    return this.userAuthService.signOut(+userId, res);
  }

  @HttpCode(200)
  @Post("signout/admin")
  singoutAdmin(@GetCurrentUserId() adminId: number, @Res({ passthrough: true }) res: Response): Promise<boolean> {
    return this.adminAuthService.signOut(+adminId, res);
  }


  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(200)
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.userAuthService.refreshToken(+userId, refreshToken, res);
  }


  @UseGuards(RefreshTokenGuard)
  @Post("refresh/admin")
  @HttpCode(200)
  async refreshTokenAdmin(
    @GetCurrentUserId() adminId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.adminAuthService.refreshToken(+adminId, refreshToken, res);
  }
  
}
