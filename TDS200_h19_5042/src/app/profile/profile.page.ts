import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthorizationService, private router: Router) { }

  private username;

  ngOnInit() {
    this.username = this.authService.getUser();
  }

  async logoutUser() {
    await this.authService.logoutUser()
    this.router.navigate(['home']);
  }

  printStuff(){
    let id = this.authService.isLoggedIn().uid;
    console.log(id);
  }

}
