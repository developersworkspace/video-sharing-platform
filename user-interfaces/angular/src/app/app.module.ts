import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeRouteComponent } from './home-route/home-route.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { RecentVideosComponent } from './recent-videos/recent-videos.component';
import { FooterComponent } from './footer/footer.component';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeRouteComponent,
    HeaderComponent,
    RecentVideosComponent,
    FooterComponent,
    GetInTouchComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
