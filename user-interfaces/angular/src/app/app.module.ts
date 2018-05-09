import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeRouteComponent } from './home-route/home-route.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { RecentVideosComponent } from './recent-videos/recent-videos.component';
import { FooterComponent } from './footer/footer.component';
import { WatchRouteComponent } from './watch-route/watch-route.component';
import { AuthGuard } from './auth.guard';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { ProfileRouteComponent } from './profile-route/profile-route.component';
import { FormsModule } from '@angular/forms';
import { MyVideosRouteComponent } from './my-videos-route/my-videos-route.component';
import { MyVideosEditRouteComponent } from './my-videos-edit-route/my-videos-edit-route.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeRouteComponent,
    HeaderComponent,
    RecentVideosComponent,
    FooterComponent,
    WatchRouteComponent,
    CallbackRouteComponent,
    ProfileRouteComponent,
    MyVideosRouteComponent,
    MyVideosEditRouteComponent,
    SideBarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
