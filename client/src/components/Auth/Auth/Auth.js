import auth0 from 'auth0-js';
import history from '../History';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'urath.auth0.com',
    clientID: 'Z3vIBMDQtjIhCguh9R60nJ9CTSnLTSWd',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://urath.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  userProfile;


  constructor() {
    //super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
    // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      let auththing = JSON.stringify(authResult);
      localStorage.setItem('authresult', auththing);
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      this.getProfile;
      // navigate to the home route
      history.replace('/home');
    }
  }

   getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      console.log("error", err)
      console.log("prfile" , profile)
      localStorage.setItem('profile', profile);
      if (profile) {
        this.userProfile = profile;
        
        //localStorage.setItem("farts", JSON.stringify(profile.sub));
        localStorage.username = profile.nickname;
        //localStorage.farts = profile.nickname;
        //localStorage.users = profile.nickname;
        //localStorage.setItem('expires_at', expiresAt);
        localStorage.user_id = profile.sub;
      }
      cb(err, profile);
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


  login() {
    this.auth0.authorize();
  }
}