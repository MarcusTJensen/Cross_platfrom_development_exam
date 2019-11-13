import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: String;
  private password: String;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    console.log("zup bitch");
  }

  async loginUser() {
      await this.authService.loginUser({username: this.username, password: this.password});
      this.router.navigate(['profile']);
  }

  async registerUser() {
      this.router.navigate(['register']);
  }
}
