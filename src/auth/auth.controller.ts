import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import type ActiveUserInterface from 'src/common/interface/user-active-interface';
import { ApiBearerAuth } from '@nestjs/swagger';

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

    @ApiBearerAuth()
    @Get('profile')
    @Auth(Role.User)
    profile(@ActiveUser() user: ActiveUserInterface) {
        return this.authService.profile(user);
    }
}
