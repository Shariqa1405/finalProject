import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Body,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptor/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinuser.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guards';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.age,
      body.username,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(body.signin, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    session.userId = user.id;

    return { message: 'login successful', user };
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  WhoAmi(@CurrentUser() user: User) {
    if (!user) {
      throw new NotFoundException('No user logged in');
    }
    return this.userService.findOne(user.id);
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;

    return { message: 'User logged out' };
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
