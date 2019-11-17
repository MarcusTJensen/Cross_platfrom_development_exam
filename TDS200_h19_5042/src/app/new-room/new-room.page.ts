import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../storage.service';
import RoomStruct from '../models/roomStruct';
import { AuthorizationService } from '../authorization.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { uuid } from 'uuid';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { google } from 'googleapis';

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
  address: string;
  inputText: boolean;
  searchResult: [];
  constructor(private camera: Camera, private geolocation: Geolocation, 
              private storageService: StorageService, private authService: AuthorizationService,
              private fireStorage: AngularFireStorage, private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.title = "";
    this.description = "";

    let user = this.authService.isLoggedIn();
    if (!user) {
      this.presentLoginPrompt();
    }
    this.inputText = true;
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
    const data: RoomStruct = {title: this.title, owner: user, description: this.description, 
                              imgUrl: this.imgUrl, address: this.address, isAvailable: true};
    this.storageService.addToDataBaseRoom(data);
    console.log(data.title);
  }

  async addPicToFirebase() {
    const fileName = `tds200-${uuid}.png`;
    const firestorageFileRef = this.fireStorage.ref(fileName);
    const uploadTask = firestorageFileRef.putString(this.cameraPreview, 'base64', { contentType: 'image/png' });
    await uploadTask.then();
    return firestorageFileRef.getDownloadURL().toPromise();
  }

  async presentLoginPrompt() {
    let alert = this.alertController.create({
      message: "You're not logged in",
      subHeader: 'You have to log in to add a room!',
      inputs: [
        {
          name: "email",
          placeholder: "email"
        },
        {
          name: "password",
          placeholder: "password",
          type: "password"
        }
      ],
      buttons: [ 
        {
          text: 'cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/']);
          }
        },
        {
          text: 'login',
          handler: data => {
            this.authService.loginUser({username: data.email, password: data.password});
            this.router.navigate(['new-room']);
          }
        },
        {
          text: 'register',
          handler: () => {
            this.router.navigate(['register']);
          }
        }
      ]
    });
    return (await alert).present();
  }

  async onInputChange() {
    /*let placesSearch =*/ 
    await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Paris&types=geocode&key=AIzaSyAsc6op7LCc15rJbzUy7vbHc9OuXiRZQSE`,
      {mode: 'no-cors'}
      ).then((r) => {
          console.log(r.json());
      });
      /*"https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&"

      var service = new google.maps.places.PlacesService();

      service.findplacefromtext*/
  }

}
