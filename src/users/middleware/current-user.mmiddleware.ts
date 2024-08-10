import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  namespace Experss {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class CurrentUSerMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    console.log(userId);

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // @ts-ignore
      req.user = user;
    }

    next();
  }
}
