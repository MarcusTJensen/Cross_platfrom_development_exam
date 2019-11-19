import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';
import { AgmCoreModule } from '@agm/core';
import { ComponentsModule } from '../components/components.module';
import { AgmDirectionModule } from 'agm-direction';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AgmDirectionModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
