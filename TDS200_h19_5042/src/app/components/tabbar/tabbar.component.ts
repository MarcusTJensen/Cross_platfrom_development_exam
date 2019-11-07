import { Component, OnInit, Input } from '@angular/core';
import RoomStruct from 'src/app/models/roomStruct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
})
export class TabbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  printSumt() {
    console.log();
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

}
