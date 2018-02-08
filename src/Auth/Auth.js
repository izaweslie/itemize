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

constructor() {
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }



