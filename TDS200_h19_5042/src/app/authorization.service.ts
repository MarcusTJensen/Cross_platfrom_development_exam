import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

/*Service that handles everything Authorization. Makes it a lot easier to reuse the functions throughout the app.
  Helps with writing less code overall*/
  constructor(private fireAuth: AngularFireAuth) { }

  async loginUser({username, password}) {
    try {
      return await this.fireAuth.auth.signInWithEmailAndPassword(username, password);
    } catch(e) {
        console.log(e);
    }
  }

  async registerUser({username, password}) {
    try {
      return await this.fireAuth.auth.createUserWithEmailAndPassword(username, password);
    } catch(e) {
        console.log(e);
    }
  }

  async logoutUser() {
    return await this.fireAuth.auth.signOut();
  }

  getUser() {
    return this.fireAuth.auth.currentUser.email;
  }

  isLoggedIn() {
    let currentUser = this.fireAuth.auth.currentUser;
    if(currentUser != null) {
      return currentUser;
    } else {
      console.log("sorry bro");
    }
}
}
