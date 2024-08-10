import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.serivce';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CurrentUserInterceptor } from './interceptors/currentUSer.interceptor';
import { CurrentUSerMiddleware } from './middleware/current-user.mmiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // // globaly scoped interceptor:
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor 
    // },
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUSerMiddleware).forRoutes('*')
  }
}
