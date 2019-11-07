import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../storage.service';
import RoomStruct from '../models/roomStruct';
import { AuthorizationService } from '../authorization.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { uuid } from 'uuid';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.page.html',
  styleUrls: ['./new-room.page.scss'],
})
export class NewRoomPage implements OnInit {

  private cameraPreview = "";
  title: string;
  description: string;
  imgUrl: string;
  constructor(private camera: Camera, private geolocation: Geolocation, 
              private storageService: StorageService, private authService: AuthorizationService,
              private fireStorage: AngularFireStorage) { }

  ngOnInit() {
    this.title = "";
    this.description = "";
  }

  async takePicWithCamera(){
    try {
      const imageData = await this.camera.getPicture();
      this.cameraPreview = imageData;
    } catch (e) {
      console.log(e);
    }
  }

  async addRoom() {
    const user = this.authService.getUser();
    console.log(user);
    this.imgUrl = await this.addPicToFirebase();
    const data: RoomStruct = {title: this.title, owner: user, description: this.description, imgUrl: this.imgUrl};
    this.storageService.addToDataBase(data);
    console.log(data.title);
  }

  async addPicToFirebase() {
    const fileName = `tds200-${uuid}.png`;
    const firestorageFileRef = this.fireStorage.ref(fileName);
    const uploadTask = firestorageFileRef.putString(this.cameraPreview, 'base64', { contentType: 'image/png' });
    await uploadTask.then();
    return firestorageFileRef.getDownloadURL().toPromise();
  }

}
