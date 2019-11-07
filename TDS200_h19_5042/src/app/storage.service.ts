import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import RoomStruct from './models/roomStruct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore) { }

  addToDataBase(newRoom: RoomStruct) {
    const db = this.firestore.collection("rooms");
    db.add(newRoom);
  }

  retrieveFromDataBase(roomId: string) {
    const room = this.firestore.collection("rooms").doc(roomId);
    const roomParsed = room.valueChanges() as Observable<RoomStruct>;
    return roomParsed
  }
}
