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
  private directions = false;

  constructor(public platform: Platform, public route: ActivatedRoute, private storageService: StorageService,
    private geolocation: Geolocation) {
    this.height = platform.height() - 56;
    this.lat = 61.248333;
    this.lng = 8.804821;
  }

  ngOnInit() {
    /*uses room id (rId), which is passed from the former page to access the database to retrieve the address
      of the active room*/
    this.route.params.subscribe((parameters) => { 
      this.rId = parameters["rId"];
    });
    const db = this.storageService.retrieveFromDataBaseRoom(this.rId);
    db.subscribe((room) => {
      this.address = room.address;
    });

    if(this.address != "") {
      this.getLatLng();
    }

  }

  /*Function that requests geocode of address of the room. Gets current location of user aswell
    Creates a origin and a destination object with latitude and longitude, which are used in the map for displaying
    directions and markers.*/
  async getLatLng() {
    const db = this.storageService.retrieveFromDataBaseRoom(this.rId);
      db.subscribe(async (room) => {
      this.address = room.address;
      //Inspired by: https://developers.google.com/maps/documentation/geocoding/intro
      let geocodeResponse = fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=AIzaSyD03B7fr-Lz0Cs_IqgpWBYe4aivxqImpss`
        );
  
      let responseJson = (await geocodeResponse).json();
      //This is inspired by: https://ionicframework.com/docs/native/geolocation
      this.geolocation.getCurrentPosition().then((res) => {
        this.origin = {lat: res.coords.latitude, lng: res.coords.longitude};
      });
      responseJson.then((r) => {
        const latDestination = r.results[0].geometry.location.lat;
        const lngDestination = r.results[0].geometry.location.lng;
        this.destination = {lat: latDestination, lng: lngDestination};
      })
    });
  }

  getDirections() {
    this.directions = true;
  }

  closeDirections() {
    this.directions = false;
  }
}
