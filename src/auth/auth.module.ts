import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OidcStrategy, buildOpenIdClient } from './oidc.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (configService: ConfigService) => {
    const client = await buildOpenIdClient(); // secret sauce! build the dynamic client before injecting it into the strategy for use in the constructor super call.
    const strategy = new OidcStrategy(configService, client);
    return strategy;
  },
  inject: [AuthService]
};

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true, defaultStrategy : 'oidc'}),
    JwtModule.register({
      secret: '',
      signOptions:{
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,OidcStrategyFactory],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
