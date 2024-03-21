import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OidcStrategy } from './oidc.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy : 'oidc'}),
    JwtModule.register({
      secret: '',
      signOptions:{
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, OidcStrategy],
  exports: [OidcStrategy, JwtStrategy, PassportModule]
})
export class AuthModule {}
