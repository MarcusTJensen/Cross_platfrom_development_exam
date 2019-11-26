import { Component, OnInit, Input } from '@angular/core';
import RoomStruct from 'src/app/models/roomStruct';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/authorization.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
})
/*Jeg var ikke klar over feilen med tab-baren min før jeg testet applikasjonen før levering
  Jeg vet dog hva som er feilen og hva som skal til for å fikse den.
  Akkurat nå er det slik at tab-baren vil lastet på nytt sammen med sidene, siden den er plassert i bunnen på alle sidene.
  Om jeg skal unngå dette, må jeg lage en egen side for tab-baren, som benytter seg av ion-tabs.
  Denne må ha en egen tabs.router.module, hvor de andre sidene legges til som children av tabsPage.
  Det er slik man egentlig skal implementere en tab-bar i Ionic, noe jeg er klar over nå.
  Håper jeg har med nok av annen funksjonalitet slik at det veier opp.*/
export class TabbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService,
              private storageService: StorageService) { }

  company: string;
  isCompany: boolean;
  ngOnInit() {
    this.isCompany = true;
  }
  async checkCompany(){
    let currentUser = await this.authService.isLoggedIn();
    if(currentUser != null){ 
      let currentUserId = currentUser.uid;
      let userData = this.storageService.retrieveFromDataBaseUser(currentUserId);
      userData.subscribe((u) => {
      if(u.company != "" || u.company != null) {
        this.isCompany = true;
      }
    });
  }
  }

  navigateToProfilePage() {
    this.router.navigate(['profile']);
    document.getElementById("profile");
  }
  
  navigateToNewRoomPage() {
    this.router.navigate(['new-room']);
  }

  navigateToHomePage() {
    this.router.navigate(['home']);
  }

  navigateToBookings() {
    this.router.navigate(['bookings']);
  }

}
