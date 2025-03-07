import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class AdminGuard extends AuthGuard('jwt'){
  constructor(private readonly reflector: Reflector){
    super()
  }

  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);

    if(!isAuthenticated)
      return false;

    const request = context.switchToHttp().getRequest();
    const admin = request.user;

    if (!admin) {
      throw new ForbiddenException('Admin not found');
    }

    if(!admin.isCreator)
      throw new ForbiddenException('Access denied. Admins only.');

    return true;
  }
}