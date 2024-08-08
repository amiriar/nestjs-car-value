import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { userDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.serivce';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(userDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('colors/:color')
  async setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('colors')
  async getColors(@Session() session: any) {
    return session.color;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;

  }

  @Post('/signup')
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return await this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }
}
