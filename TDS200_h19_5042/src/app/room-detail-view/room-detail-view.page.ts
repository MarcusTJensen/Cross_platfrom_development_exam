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
  private bookings;
  actualRatings$ = [];
  floor: number;
  capacity: number;
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
      this.floor = r.floor;
      this.capacity = r.capacity;
      console.log(r.ratings);
      let ratingsFilter = r.ratings.filter((rFilter) => {
        return rFilter != null;
      })
      this.ratings = ratingsFilter;
      this.updatedRoom.ratings = this.ratings;
    });
    this.uid = this.authService.isLoggedIn().uid;
    const user = this.storageService.retrieveFromDataBaseUser(this.uid);
    user.subscribe((u) => {
      this.activeUser = u;
      let filteredBookings = u.bookings.filter((filtered) => {
        return filtered != null;
      })
      this.bookings = filteredBookings
      this.activeUser.bookings = this.bookings;
    });

  }

  bookRoom() {
    this.updatedRoom.isAvailable = false;
    this.updatedRoom.rId = this.roomId;
    this.activeUser.bookings.push(this.updatedRoom);
    this.storageService.updateDatabaseRoom(this.roomId, this.updatedRoom);
    this.storageService.updateDatabaseUser(this.uid, this.activeUser);
  }
/*Function that finds the correct room from the bookings list and removes it.
  The isAvailable field is then set to true and the firestore collections are updated.
  The room will now be displayed on the home page again.*/
  unBookRoom() {
    for (var i = 0; i < this.activeUser.bookings.length; i++) {
      let activeRoom = this.activeUser.bookings[i] as RoomStruct;
      if(activeRoom.address === this.updatedRoom.address) {
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
    this.ratingNum = e;
  }
/*Function that creates a rating object based on input from the rating element
  It then checks the active users booked rooms to delete the current version of the room
  So that it can be replaced by the updated version.*/
  finishedRating(){
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
