import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRouteComponent } from './home-route/home-route.component';
import { WatchRouteComponent } from './watch-route/watch-route.component';
import { AuthGuard } from './auth.guard';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { ProfileRouteComponent } from './profile-route/profile-route.component';
import { MyVideosRouteComponent } from './my-videos-route/my-videos-route.component';
import { MyVideosEditRouteComponent } from './my-videos-edit-route/my-videos-edit-route.component';
import { MyVideosNewRouteComponent } from './my-videos-new-route/my-videos-new-route.component';

const appRoutes: Routes = [
  {
    component: CallbackRouteComponent,
    path: 'callback',
  },
  {
    // canActivate: [
    //   AuthGuard,
    // ],
    component: HomeRouteComponent,
    path: ':profileName',
  },
  {
    canActivate: [
      AuthGuard,
    ],
    component: MyVideosRouteComponent,
    path: ':profileName/my-videos',
  },
  {
    canActivate: [
      AuthGuard,
    ],
    component: MyVideosNewRouteComponent,
    path: ':profileName/my-videos/new',
  },
  {
    canActivate: [
      AuthGuard,
    ],
    component: MyVideosEditRouteComponent,
    path: ':profileName/my-videos/:videoId',
  },
  {
    canActivate: [
      AuthGuard,
    ],
    component: ProfileRouteComponent,
    path: ':profileName/profile',
  },
  {
    canActivate: [
      AuthGuard,
    ],
    component: WatchRouteComponent,
    path: ':profileName/watch/:videoId',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
