import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(createUserDto: CreateUserDto) {
    const { username, email, password, firstname, lastname } = createUserDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findByUsernameOrEmail(username, email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    return this.usersRepository.createUser({
      username,
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Find user by email
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const payload = { username: user.username, userid: user.userid };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '3d',
    });

    return { message: 'Login successful', token };
  }

  async checkUser(user: any) {
    return { message: 'Valid user', user };
  }
}
