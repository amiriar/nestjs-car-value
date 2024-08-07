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

    @UseInterceptors(ClassSerializerInterceptor)
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
