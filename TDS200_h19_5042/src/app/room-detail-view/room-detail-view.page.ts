import { Component, OnInit } from '@angular/core';
import RoomStruct from '../models/roomStruct';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';

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
  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService) {
    this.route.params.subscribe((parameters) => { 
      this.roomId = parameters["rId"];
      console.log(parameters);
      console.log(this.roomId);
  });
  }

  ngOnInit() {
    this.room = this.storageService.retrieveFromDataBase(this.roomId);
    this.room.subscribe((r) => {
      console.log(r.title);
      this.owner = r.owner;
      this.title = r.title;
      this.description = r.description;
      this.imgUrl = r.imgUrl;
    });
  }

}
