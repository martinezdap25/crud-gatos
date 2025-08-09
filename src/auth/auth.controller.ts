import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from 'src/enums/role.enum';

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
    @Roles(Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    profile(
        @Req() req: RequestWithUser
    ) {
        return req.user;
    }
}
