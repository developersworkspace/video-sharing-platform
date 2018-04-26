import { Component, OnInit } from '@angular/core';
import { Video } from '../entities/video';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent extends BaseComponent implements OnInit {

  public latestVideo: Video = null;

  public recentVideos: Video[] = null;

  public videos: Video[] = null;

  constructor(
    activatedRoute: ActivatedRoute,
    http: HttpClient,
  ) {
    super(activatedRoute, http);

    this.recentVideos = [];

    this.videos = [];
  }

  public ngOnInit(): void {
    this.loadProfile();
  }

  public onLoad(): void {
    this.loadVideos();
  }

  protected loadVideos(): void {
    this.http.get(`${this.apiUri}/video?profileName=${this.profile.name}`).subscribe((videos: Video[]) => {
      this.videos = videos;

      this.latestVideo = this.videos[0];

      this.recentVideos = this.videos.slice(0, 2);
    });
  }

}
