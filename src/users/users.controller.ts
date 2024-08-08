import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { userDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.serivce';


@Controller('auth')
@Serialize(userDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @Post("/signup")
    async createUser(@Body() body: createUserDto){
        return await this.authService.signup(body.email, body.password)
    }

    @Post("/signin")
    async signin(@Body() body: createUserDto){
        return await this.authService.signin(body.email, body.password)
    }
    
    @Get("/:id")
    async findUser(@Param('id') id: string){
        const user = await this.usersService.findOne(parseInt(id))
        if(!user) throw new NotFoundException()
        return user
    }

    @Get()
    async findAllUsers(@Query('email') email: string){
        return await this.usersService.find(email)
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: updateUserDto){
        return await this.usersService.update(parseInt(id), body)
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string){
        return await this.usersService.remove(parseInt(id))
    }

}
