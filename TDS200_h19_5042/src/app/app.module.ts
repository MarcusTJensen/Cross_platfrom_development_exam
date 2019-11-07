import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

var firebaseConfig = {
  apiKey: "AIzaSyC7vF1p9huVNwv1HIc-yzhsWIVc3eaKYvk",
  authDomain: "tds200-exam-2019.firebaseapp.com",
  databaseURL: "https://tds200-exam-2019.firebaseio.com",
  projectId: "tds200-exam-2019",
  storageBucket: "tds200-exam-2019.appspot.com",
  messagingSenderId: "256607788970",
  appId: "1:256607788970:web:8d32f9275d7651bbd295d3",
  measurementId: "G-G5LBGSHRXN"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
