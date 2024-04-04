import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Client, UserinfoResponse, TokenSet, Issuer } from 'openid-client';

export const buildOpenIdClient = async () => {
  // const TrustIssuer = await Issuer.discover('https://accounts.google.com/.well-known/openid-configuration');
  // const client = new TrustIssuer.Client({
  //   client_id: "819680115435-j7mj0srfgkmbrdum916mu0nuhd3t8i3t.apps.googleusercontent.com", // configService.get<string>('oidc.clientID'),
  //   client_secret: "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", // configService.get<string>('oidc.clientSecret'),
  // });
  // return client;

  const TrustIssuer = await Issuer.discover('https://www.joseon.com/.well-known/openid-configuration');
  const client = new TrustIssuer.Client({
    // token_endpoint_auth_signing_alg: "https://www.joseon.com/_special/rest/OAuth2:token",
    // authorization_signed_response_alg: "https://www.joseon.com/_special/rest/OAuth2:auth",
    client_id: "oaap-ahofgp-fdoj-dwdm-idww-rhtyfi64", // configService.get<string>('oidc.clientID'),
    client_secret: "sk_slY4qta3XQdBv8f7MWiJiQw4nMqRm", // configService.get<string>('oidc.clientSecret'),
  });
  return client;
};

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  client: Client;

  constructor(
    @InjectRepository(User)
    private configService: ConfigService,
    client: Client) {
      // super({
      //   client: client,
      //   params: {
      //     redirect_uri: "http://localhost:3001/auth/callback", // configService.get<string>('oidc.callbackURL'),
      //     scope: "openid profile email",
      //   },
      //   passReqToCallback: false,
      //   usePKCE: false,
      // });

      super({
        client: client,
        params: {
          response_type: "token",
          redirect_uri: "https://3.7.222.91/auth/callback", // configService.get<string>('oidc.callbackURL'),
          scope: "openid",
        },
        passReqToCallback: false,
        usePKCE: false,
      });

    this.client = client;
  }

  async validate(tokenset: TokenSet, iss:string, aud: string): Promise<any> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenset);

    try {
      const id_token = tokenset.id_token
      const access_token = tokenset.access_token
      const refresh_token = tokenset.refresh_token
      const user = {
        id_token,
        access_token,
        refresh_token,
        userinfo,
      }
      console.log(user);
      console.log(tokenset);
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
