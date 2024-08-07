import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/create-user.dto';


@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post("/signup")
    async createUser(@Body() body: createUserDto){
        return await this.usersService.create(body.email, body.password)
    }
}
