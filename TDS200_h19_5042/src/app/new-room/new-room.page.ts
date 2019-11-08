import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../storage.service';
import RoomStruct from '../models/roomStruct';
import { AuthorizationService } from '../authorization.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { uuid } from 'uuid';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.page.html',
  styleUrls: ['./new-room.page.scss'],
})
export class NewRoomPage implements OnInit {

  username: string;
  pass: string;
  cameraPreview: string;
  title: string;
  description: string;
  imgUrl: string;
  constructor(private camera: Camera, private geolocation: Geolocation, 
              private storageService: StorageService, private authService: AuthorizationService,
              private fireStorage: AngularFireStorage, private alertController: AlertController) { }

  ngOnInit() {
    this.title = "";
    this.description = "";
  }

  async takePicWithCamera(){
    try {
      const imageData = await this.camera.getPicture();
      this.cameraPreview = imageData;
      console.log(this.cameraPreview)
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

  checkLoginStatus() {
    let isloggedIn = this.authService.getUser();
    if(isloggedIn === "") {
      this.presentLoginPrompt();
    }
  }

  async presentLoginPrompt() {
    let alert = this.alertController.create({
      message: 'You have to log in to add a room!',
      buttons: [ 
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'login',
          handler: () => {
            this.authService.loginUser({username: this.username, password: this.pass});
          }
        },
        {
          text: 'register',
          handler: () => {
            this.authService.registerUser({username: this.username, password: this.pass});
          }
        }
      ]
    });
    (await alert).present()
  }

}
