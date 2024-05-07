import { Controller, Get, Body, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialsDto);
    }

    @Get('/login')
    @UseGuards(AuthGuard('oidc'))
    async login(@Request() req) {
    //   if (req.user) {
    //     return this.authService.redirectToIntendedPage(req);
    //   }
    }
  
    @Get('/callback')
    @UseGuards(AuthGuard('oidc'))
    async callback(@Request() req) {
      const user = req.user;
      return this.authService.signIn(user);
    }
  
    // @Get('logout') // Optional logout route
    // async logout(@Request() req) {
    //   req.logout(); // Trigger Passport's logout logic (may involve clearing session data)
    //   return { message: 'Successfully logged out' };
    // }
}
