import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
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
    protected router: Router,
  ) {
    super(activatedRoute, http);

    this.recentVideos = [];

    this.videos = [];
  }

  public ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.loadVideo();
        this.loadVideos();

        window.scrollTo(0, 0);
      }
    });
  }

  public onClickSubscribe(): void {
    this.http.get(`${this.apiUri}/subscription?profileName=${this.profile.name}`, {
      headers: this.getHeaders(),
    }).subscribe((response: any) => {
      window.location.href = response.uri;
    });
  }

  protected onLoad(): void {
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
