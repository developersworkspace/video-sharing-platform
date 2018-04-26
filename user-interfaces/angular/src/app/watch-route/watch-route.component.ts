import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../entities/video';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watch-route',
  templateUrl: './watch-route.component.html',
  styleUrls: ['./watch-route.component.css']
})
export class WatchRouteComponent extends BaseComponent implements OnInit {

  public latestVideo: Video = null;

  public recentVideos: Video[] = null;

  public video: Video = null;

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
    this.loadVideo();
    this.loadVideos();
  }

  protected loadVideo(): void {
    this.http.get(`${this.apiUri}/video?id=${this.activatedRoute.snapshot.params.videoId}`).subscribe((video: Video) => {
      this.video = video;
    });
  }

  protected loadVideos(): void {
    this.http.get(`${this.apiUri}/video?profileName=${this.profile.name}`).subscribe((videos: Video[]) => {
      this.videos = videos;

      this.latestVideo = this.videos[0];

      this.recentVideos = this.videos.slice(0, 2);
    });
  }

}
