import { CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{
    constructor(){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        
        if(!request.session.userId)
            throw new UnauthorizedException()
        return request.session.userId
    }
}