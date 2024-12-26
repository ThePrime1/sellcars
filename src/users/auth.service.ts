import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if the eamil is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash the password
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.usersService.create(email, result);
    // Return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    const [salt, storedPassword] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedPassword !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials!');
    }

    return user;
  }
}