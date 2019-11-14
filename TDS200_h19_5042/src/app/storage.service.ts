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

  retrieveFromDataBaseRoom(roomId: string) {
    const room = this.firestore.collection("rooms").doc(roomId);
    const roomParsed = room.valueChanges() as Observable<RoomStruct>;
    return roomParsed
  }

  retrieveFromDataBaseUser(userId: string) {
    const room = this.firestore.collection("users").doc(userId);
    const userParsed = room.valueChanges() as Observable<userStruct>;
    return userParsed
  }

  updateDatabaseRoom(roomId: string, updatedRoom: RoomStruct) {
    const room = this.firestore.collection('rooms').doc(roomId);
    //console.log(updatedRoom.address);
    room.update(updatedRoom);
  }

  updateDatabaseUser(uid: string, updatedUser: userStruct) {
    const user = this.firestore.collection('users').doc(uid);
    user.update(updatedUser);
  }
}
