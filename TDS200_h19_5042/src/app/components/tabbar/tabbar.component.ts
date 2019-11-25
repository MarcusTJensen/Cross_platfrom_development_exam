import { Component, OnInit, Input } from '@angular/core';
import RoomStruct from 'src/app/models/roomStruct';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/authorization.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
})
export class TabbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService,
              private storageService: StorageService) { }

  company: string;
  isCompany: boolean;
  ngOnInit() {
    this.isCompany = true;
  }
  async checkCompany(){
    let currentUser = await this.authService.isLoggedIn();
    if(currentUser != null){ 
      let currentUserId = currentUser.uid;
      let userData = this.storageService.retrieveFromDataBaseUser(currentUserId);
      userData.subscribe((u) => {
      if(u.company != "" || u.company != null) {
        this.isCompany = true;
      }
    });
  }
  }

  navigateToProfilePage() {
    this.router.navigate(['profile']);
    document.getElementById("profile");
  }
  
  navigateToNewRoomPage() {
    this.router.navigate(['new-room']);
  }

  navigateToHomePage() {
    this.router.navigate(['home']);
  }

  navigateToBookings() {
    this.router.navigate(['bookings']);
  }

}
