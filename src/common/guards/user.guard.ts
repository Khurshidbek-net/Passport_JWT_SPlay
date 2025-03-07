import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class UserGuard extends AuthGuard('jwt') implements CanActivate{
  constructor(private readonly reflector: Reflector){
    super()
  }

  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);

    if(!isAuthenticated)
      return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (!user.isActive)
      throw new ForbiddenException('User is not active');

    return true;
  }
}