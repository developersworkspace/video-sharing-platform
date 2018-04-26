import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRouteComponent } from './home-route/home-route.component';

const appRoutes: Routes = [
  { path: ':profileName', component: HomeRouteComponent },
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
