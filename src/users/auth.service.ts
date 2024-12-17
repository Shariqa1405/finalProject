import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _ascrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_ascrypt);

@Injectable()
export class AuthService {
  constructor(private userSerivce: UsersService) {}

  async signup(email: string, password: string, age: number, username: string) {
    const users = await this.userSerivce.find(email);

    if (users.length) {
      throw new BadRequestException('emais is in use');
    }
    const usersname = await this.userSerivce.findByUsername(username);

    if (usersname) {
      throw new BadRequestException('username is in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.userSerivce.create(email, result, age, username);

    return user;
  }

  async signin(signin: string, password: string) {
    const user = await this.userSerivce.findname(signin);

    if (!user) {
      throw new NotFoundException('email or username not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('password is incorrect');
    }

    return user;
  }
}
