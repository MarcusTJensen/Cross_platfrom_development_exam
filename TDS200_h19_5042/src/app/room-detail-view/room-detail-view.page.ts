import { Component, OnInit } from '@angular/core';
import RoomStruct from '../models/roomStruct';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import userStruct from '../models/userStruct';

@Component({
  selector: 'app-room-detail-view',
  templateUrl: './room-detail-view.page.html',
  styleUrls: ['./room-detail-view.page.scss'],
})
export class RoomDetailViewPage implements OnInit {

  roomId: string;
  room: Observable<RoomStruct>;
  title: string;
  owner: string;
  description: string;
  imgUrl: string;
  address: string;
  updatedRoom: RoomStruct;
  activeUser: userStruct;
  uid: string;
  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService,
              private authService: AuthorizationService) {
    this.route.params.subscribe((parameters) => { 
      this.roomId = parameters["rId"];
      console.log(parameters);
      console.log(this.roomId);
  });
  }

  ngOnInit() {
    this.room = this.storageService.retrieveFromDataBaseRoom(this.roomId);
    this.room.subscribe((r) => {
      console.log(r.title);
      this.owner = r.owner;
      this.title = r.title;
      this.description = r.description;
      this.imgUrl = r.imgUrl;
      this.address = r.address;
      this.updatedRoom = r;
    });
    this.uid = this.authService.isLoggedIn().uid;
    const user = this.storageService.retrieveFromDataBaseUser(this.uid);
    user.subscribe((u) => {
      this.activeUser = u;
    });
  }

  bookRoom() {
    
    console.log(this.updatedRoom);
    console.log("yallah", this.updatedRoom.title);
    console.log(this.activeUser.bookings);
    this.updatedRoom.isAvailable = false;

    const bookings = this.updatedRoom;
    this.activeUser.bookings.push(this.updatedRoom);
    this.storageService.updateDatabaseRoom(this.roomId, this.updatedRoom);
    this.storageService.updateDatabaseUser(this.uid, this.activeUser);
    console.log(this.activeUser.company);
  }

}
