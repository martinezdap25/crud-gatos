import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from 'src/enums/role.enum';
import { auth } from './decorators/auth.decorators';

interface RequestWithUser extends Request {
    user: {
        email: string,
        role: string
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    login(
        @Body() loginDto: loginDto
    ) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(
        @Body() registerDto: registerDto
    ) {
        return this.authService.register(registerDto);
    }

    @Get('profile')
    @auth(Role.Admin)
    profile(
        @Req() req: RequestWithUser
    ) {
        return req.user;
    }
}
