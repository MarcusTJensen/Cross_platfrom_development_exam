import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import RoomStruct from './models/roomStruct';
import { Observable } from 'rxjs';
import userStruct from './models/userStruct';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore) { }

  addToDataBaseRoom(newRoom: RoomStruct) {
    const db = this.firestore.collection("rooms");
    db.add(newRoom);
  }
  addToDatabaseUser(newUser: userStruct, uid: string) {
    const db = this.firestore.collection("users");
    db.doc(uid).set(newUser);
    
  }

  retrieveFromDataBase(roomId: string) {
    const room = this.firestore.collection("rooms").doc(roomId);
    const roomParsed = room.valueChanges() as Observable<RoomStruct>;
    return roomParsed
  }
}
