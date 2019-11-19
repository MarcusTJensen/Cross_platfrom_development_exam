import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoomDetailViewPage } from './room-detail-view.page';
import { ComponentsModule } from '../components/components.module';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: RoomDetailViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AgmCoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoomDetailViewPage]
})
export class RoomDetailViewPageModule {}
