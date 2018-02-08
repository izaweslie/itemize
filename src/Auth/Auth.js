// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'https://warm-waters-37423.herokuapp.com/',
    clientID: 'cYkWhCZ4ZSMAzoU4Kj3kWn8wv72gUKdN',
    redirectUri: 'https://warm-waters-37423.herokuapp.com/',
    audience: 'https://itemizeteam.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}

