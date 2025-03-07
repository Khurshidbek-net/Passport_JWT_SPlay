import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { JwtPayload } from "../types";
import { userInfo } from "os";
import { use } from "passport";


export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    const user = request.user as JwtPayload

    if (!user) {
      throw new ForbiddenException("Invalid password")
    }

    return user.id
  }
)