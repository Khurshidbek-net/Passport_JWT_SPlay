import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { JwtFromRequestFunction, Strategy } from "passport-jwt";
import { JwtPayload, JwtPayloadWithRefreshToken } from "../types";

export const cookieExctractor: JwtFromRequestFunction = (req: Request) => {
  if (req && req.cookies) {
    return req.cookies['refresh_token']
  }
  return null
}

@Injectable()
export class RefreshTokenCookieStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: cookieExctractor,
      secretOrKey: process.env.refresh_key!,
      passReqToCallback: true
    })
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw new ForbiddenException("Invalid refresh token")
    }

    return { ...payload, refreshToken }
  }
}