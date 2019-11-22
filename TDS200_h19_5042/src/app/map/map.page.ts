import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  lat: number;
  lng: number;
  private origin = {};
  private destination = {};
  height = 0;
  private address: string;
  private rId: string;

  constructor(public platform: Platform, public route: ActivatedRoute, private storageService: StorageService,
    private geolocation: Geolocation) {
    console.log(platform.height());
    this.height = platform.height() - 56;
    this.lat = 61.248333;
    this.lng = 8.804821;
  }

  ngOnInit() {
    this.route.params.subscribe((parameters) => { 
      this.rId = parameters["rId"];
      console.log(parameters);
      console.log(this.rId);
    });
    const db = this.storageService.retrieveFromDataBaseRoom(this.rId);
    db.subscribe((room) => {
      this.address = room.address;
      console.log(this.address);
    });
    console.log(this.address);

    if(this.address != "") {
      this.getLatLng();
    }

  }

  async getLatLng() {
    console.log(this.address);
    const db = this.storageService.retrieveFromDataBaseRoom(this.rId);
      db.subscribe(async (room) => {
      this.address = room.address;
      console.log(this.address);
      let geocodeResponse = fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=AIzaSyD03B7fr-Lz0Cs_IqgpWBYe4aivxqImpss`
        );
  
      let responseJson = (await geocodeResponse).json();
      console.log(responseJson);
  
      this.geolocation.getCurrentPosition().then((res) => {
        this.origin = {lat: res.coords.latitude, lng: res.coords.longitude};
        console.log(this.origin);
      });
      responseJson.then((r) => {
        const latDestination = r.results[0].geometry.location.lat;
        const lngDestination = r.results[0].geometry.location.lng;
        this.destination = {lat: latDestination, lng: lngDestination};
        console.log(`YAYAYAYAYAYYAYAYAYA${this.lat}, ${this.lng}`);
      })
    });
  }

}
