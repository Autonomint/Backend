require('dotenv').config();
import 'dotenv/config';

export default () =>({
    pKey: process.env.P_KEY,
    oidc:{
        issuer: process.env.OIDC_ISSUER,
        authorizationURL: process.env.OIDC_AUTH_URL,
        clientID: process.env.OIDC_CLIENT_ID,
        clientSecret: process.env.OIDC_CLIENT_SECRET,
        callbackURL: process.env.OIDC_CALLBACK_URL,
        tokenURL: process.env.OIDC_TOKEN_URL,
    }
})