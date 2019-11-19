import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import userStruct from '../models/userStruct';
import RoomStruct from '../models/roomStruct';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  password: string;
  company: string;

  constructor(private authService: AuthorizationService, private router: Router,
              private storageService: StorageService) { }

  ngOnInit() {
  }

  register() {
    let user = this.authService.registerUser({username: this.username, password: this.password});
    return user
  }

    async addUserToDb() {
    let createdUser = await this.register();
    this.authService.loginUser({username: this.username, password: this.password});
    let aRoom: RoomStruct = {title: "ja", description: "okokokok", imgUrl: "nei", owner: "me", address: "to da left", isAvailable: false, rId: ""};
    let data: userStruct = {email: this.username, company: this.company, bookings: [null]};
    let uid = this.authService.isLoggedIn().uid;
    this.storageService.addToDatabaseUser(data, uid);
    this.router.navigate(['profile']);
  }

}
