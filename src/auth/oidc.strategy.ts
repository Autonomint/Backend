import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-openidconnect';
import { User } from "./user.entity";
import { OidcPayload } from "./oidc-payload.interface";

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      issuer: "process.env.OIDC_ISSUER",
      authorizationURL: "process.env.OIDC_AUTH_URL",
      clientID: "process.env.OIDC_CLIENT_ID",
      clientSecret: "process.env.OIDC_CLIENT_SECRET",
      callbackURL: "process.env.OIDC_CALLBACK_URL",
      tokenURL: "process.env.OIDC_TOKEN_URL",
      scope: ['openid', 'profile', 'email', 'address']
    });
  }

  async validate(payload: OidcPayload, done: Function) {

    const { id, name, email, address} = payload;

    const user = await this.userRepository.findOne({ where: {username:id}});

    if(!user){
      throw new UnauthorizedException();
    }

    return done(null, user);
  }
}
