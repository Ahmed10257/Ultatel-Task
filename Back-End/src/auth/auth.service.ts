
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    // Find the user with the given email
    const user = await this.usersService.findOneByEmail(email);
    // If the user does not exist, throw an UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    // If the password is invalid, throw an UnauthorizedException
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Create a payload with the user's id and email
    const payload = { sub: user.id, username: user.email };
    // Sign the payload and return the access token
    const access_token = await this.jwtService.signAsync(payload);
    // Return the access token
    return {
      access_token,
    };
  }


  async register(user: any) {
    // Check if the email already exists
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create the new user
    const newUser = await this.usersService.create({ ...user, password: hashedPassword });

    // Remove the password from the result
    const { password, ...result } = newUser;

    // Return the result
    return result;
  }

}