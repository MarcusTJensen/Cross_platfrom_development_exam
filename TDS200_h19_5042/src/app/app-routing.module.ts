import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { HomePageModule } from './home/home.module';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from'@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',
          ...canActivate(redirectLoggedInTo(['profile'])) },
  { path: 'room-detail-view/:rId', loadChildren: './room-detail-view/room-detail-view.module#RoomDetailViewPageModule' },
  { path: 'new-room', loadChildren: './new-room/new-room.module#NewRoomPageModule',
          ...canActivate(redirectUnauthorizedTo(['login'])) },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule',
          ...canActivate(redirectUnauthorizedTo(['login'])) }
];

/*const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, 
    children: [
      { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
    ]}
];*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
