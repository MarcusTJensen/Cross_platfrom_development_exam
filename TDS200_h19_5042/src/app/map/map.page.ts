import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;
  height = 0;

  constructor(public platform: Platform) {
    console.log(platform.height());
    this.height = platform.height() - 56;
  }

  ngOnInit() {
  }

}
