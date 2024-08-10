import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {  
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    if (!request.user)
      throw new UnauthorizedException('Access Not Granted.');
    if (request.user.admin) {
      return true;
    } else {
      throw new UnauthorizedException('Access Not Granted.');
    }
  }
}
