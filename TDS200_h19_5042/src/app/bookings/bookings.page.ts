import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { AuthorizationService } from '../authorization.service';
import { Observable } from 'rxjs';
import RoomStruct from '../models/roomStruct';
import userStruct from '../models/userStruct';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  private myBookings$: Observable<RoomStruct[]>;
  constructor(private storageService: StorageService, private authService: AuthorizationService) { }

  ngOnInit() {

    let userId = this.authService.isLoggedIn().uid;

    let db = this.storageService.getUserData();
    let users = db.valueChanges() as Observable<userStruct[]>;
    //this.myBookings$ = userData as Observable<RoomStruct[]>;
    let userData = this.storageService.retrieveFromDataBaseUser(userId);

    userData.subscribe((u) => {
      this.myBookings$ = u.bookings as unknown as Observable<RoomStruct[]>;
      console.log(u.bookings);
      return(this.myBookings$);
    })
  }

}
