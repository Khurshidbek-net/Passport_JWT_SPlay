import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import * as bcrypt from 'bcrypt'
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { Admin } from "@prisma/client";
import { ResponseFields, Tokens } from "../common/types";
import { PrismaService } from "../prisma/prisma.service";



@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService

  ) { }

  async signUp(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(createAdminDto.email);

    if (candidate)
      throw new BadRequestException("Admin already exists")

    const admin = await this.adminService.create(createAdminDto)

    const response = {
      message: "You have successfully registered",
      adminId: admin.id
    }

    return response;
  }

  async signIn(singInDto: SignInDto, res: Response): Promise<ResponseFields> {
    const { email, password } = singInDto;

    const admin = await this.adminService.findAdminByEmail(email);

    if (!admin) {
      throw new BadRequestException("Invalid email or password")
    }

    const matchPass = await bcrypt.compare(password, admin.hashedPassword);

    if (!matchPass) {
      throw new BadRequestException("Admin is not active");
    }

    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 11);
    const updatedAdmin = await this.adminService.updateRefreshToken(
      admin.id,
      hashed_refresh_token
    );

    if (!updatedAdmin) {
      throw new InternalServerErrorException("Cannot save token")
    }

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 1296000000,
      httpOnly: true
    });

    const response = {
      id: admin.id,
      access_token: tokens.access_token
    }

    return response;
  }

  async signOut(adminId: number, res: Response): Promise<boolean> {
    const admin = await this.prismaService.admin.updateMany({
      where: {
        id: adminId,
        hashedToken: {
          not: null
        },
      },
      data: {
        hashedToken: null
      }
    })

    if (!admin) {
      throw new ForbiddenException("Admin not verified")
    }

    res.clearCookie('refresh_token')
    return true;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response): Promise<ResponseFields> {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (userId != decodedToken["id"]) {
      throw new BadRequestException("Not allowed")
    }

    const admin = await this.adminService.findOne(+userId);

    if (!admin || !admin.hashedToken) {
      throw new BadRequestException("User not found")
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashedToken
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const tokens = await this.getTokens(admin);


    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 11);
    await this.adminService.updateRefreshToken(+admin.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 1296000000,
      httpOnly: true
    });

    const response = {
      id: admin.id,
      access_token: tokens.access_token
    };

    return response;
  }

  async getTokens(admin: Admin): Promise<Tokens> {
    const payload = {
      id: admin.id,
      email: admin.email
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