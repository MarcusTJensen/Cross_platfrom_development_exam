import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import RoomStruct from '../models/roomStruct';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAvailable = true;

  private rooms$: Observable<RoomStruct[]>;

  constructor(private firestore: AngularFirestore, private router: Router,
              private storageService: StorageService) {}

  ngOnInit() {
    this.rooms$ = this.firestore.collection("rooms").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RoomStruct;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    
  }

  async goToDetailView(id: string) {
    this.router.navigate(["room-detail-view/" + id]);
  }
}
