import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

import { User } from '../models/user';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('31d9N542GyB7uvU8K1tU7ugbsQEOFrMw', 'beetlegius.auth0.com', {});

  //Store profile object in auth class
  userProfile: User;

  constructor(private router: Router) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
        if(error){ throw new Error(error); }
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['/']);
  }
}
