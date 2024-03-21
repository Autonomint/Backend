import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-openidconnect';
import { User } from "./user.entity";
import { OidcPayload } from "./oidc-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService
  ) {
    super({
      issuer: configService.get<string>('oidc.issuer'),
      authorizationURL: configService.get<string>('oidc.authorizationURL'),
      clientID: configService.get<string>('oidc.clientID'),
      clientSecret: configService.get<string>('oidc.clientSecret'),
      callbackURL: configService.get<string>('oidc.callbackURL'),
      tokenURL: configService.get<string>('oidc.tokenURL'),
      scope: ['openid', 'profile', 'email']
    });
  }

  async validate(payload: OidcPayload) {

    const { id, name, email, address} = payload;

    const user = await this.userRepository.findOne({ where: {username:id}});

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}
