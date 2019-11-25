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

  /*Service made to handle everything related to storage. Retrieving, updating and deleting functions are all 
    placed here.*/

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

  setRoomId(rId: string, id: string) {
    const room = this.firestore.collection("rooms").doc(rId);
    const roomParsed = room as unknown as RoomStruct;
    roomParsed.rId = id;
    room.update(roomParsed);
  }

  retrieveFromDataBaseUser(userId: string) {
    const room = this.firestore.collection("users").doc(userId);
    const userParsed = room.valueChanges() as Observable<userStruct>;
    return userParsed
  }

  getUserData() {
    const room = this.firestore.collection("users");
    return room;
  }

  updateDatabaseRoom(roomId: string, updatedRoom: RoomStruct) {
    const room = this.firestore.collection('rooms').doc(roomId);
    room.update(updatedRoom);
  }

  updateDatabaseUser(uid: string, updatedUser: userStruct) {
    const user = this.firestore.collection('users').doc(uid);
    user.update(updatedUser);
  }
}
