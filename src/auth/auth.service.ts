import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'node_modules/bcryptjs';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login({ email, password }: loginDto) {

        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

        const payload = {
            email: user.email
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }

    async register({ name, email, password }: registerDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) throw new BadRequestException("User already exists");

        return this.usersService.create(
            {
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            }
        );

    }

}
