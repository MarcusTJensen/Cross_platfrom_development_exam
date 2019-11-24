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

  Arr = Array;

  private comment: string;
  private ratingNum;
  private rating;
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
  isAvailable: boolean;
  isRating: boolean;
  private ratings;
  actualRatings$ = [];
  ratingExists: boolean = false;
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
      this.isAvailable = r.isAvailable;
      this.ratings = r.ratings;
      console.log(r.ratings);
      if(!r.ratings[0].comment){
        this.ratingExists = false;
      } else {
        this.ratingExists = true;
      }
      /*if(r.ratings.length === 1 && r.ratings.includes(null)) {
        this.ratingExists = false;
        console.log(r.ratings);
      } else if(r.ratings.includes({})) {
        this.ratingExists = false;
      } else {
        this.ratingExists = true;
        console.log(r.ratings);
      }*/
    });

    console.log(this.ratings);

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
    this.updatedRoom.rId = this.roomId;
    this.activeUser.bookings.push(this.updatedRoom);
    this.storageService.updateDatabaseRoom(this.roomId, this.updatedRoom);
    this.storageService.updateDatabaseUser(this.uid, this.activeUser);
    console.log(this.activeUser.company);
  }

  unBookRoom() {
    /*if(this.activeUser.bookings.length <= 1) {
      this.activeUser.bookings.pop();
    } else {*/
        for (var i = 0; i < this.activeUser.bookings.length; i++) {
          console.log(this.updatedRoom);
          console.log(this.activeUser.bookings[i]);
          let activeRoom = this.activeUser.bookings[i] as RoomStruct;
          if(activeRoom.address === this.updatedRoom.address) {
            console.log(this.updatedRoom);
            console.log(this.activeUser.bookings[i]);
            this.activeUser.bookings.splice(i, 1);
          }
        }
    this.updatedRoom.isAvailable = true;
    this.updatedRoom.rId = this.roomId;
    this.storageService.updateDatabaseRoom(this.roomId, this.updatedRoom);
    this.storageService.updateDatabaseUser(this.uid, this.activeUser);
  }

  addRating() {
    this.isRating = true;

  }

  onRateChange(e: Event) {
    console.log(e);
    this.ratingNum = e;
  }

  finishedRating(){
    /*if(this.updatedRoom.ratings.includes(null) && this.updatedRoom.ratings.length <=1 ) {
      this.updatedRoom.ratings.pop();
    }*/
    let rating = {rating: this.ratingNum, comment: this.comment, writer: this.activeUser.email};
    for(var i = 0; i < this.activeUser.bookings.length; i++) {
      let activeRoom = this.activeUser.bookings[i] as RoomStruct;
      if(activeRoom.rId === this.updatedRoom.rId) {
        this.activeUser.bookings.splice(i, 1);
      }
    }
    this.updatedRoom.ratings.push(rating);
    this.activeUser.bookings.push(this.updatedRoom);
    this.storageService.updateDatabaseRoom(this.roomId, this.updatedRoom);
    this.storageService.updateDatabaseUser(this.uid, this.activeUser);
    this.isRating = false;
  }

  openMapWithDirections() {
    this.router.navigate(['map/' + this.roomId]);
  }
}
