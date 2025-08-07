import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    login(
        @Body() loginDto: loginDto
    ){
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(
        @Body() registerDto: registerDto
    ){
        return this.authService.register(registerDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(){
        return "Profile";
    }
}
