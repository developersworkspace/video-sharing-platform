import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Video } from '../entities/video';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-videos-route',
  templateUrl: './my-videos-route.component.html',
  styleUrls: ['./my-videos-route.component.css']
})
export class MyVideosRouteComponent extends BaseComponent implements OnInit {

  public videos: Video[] = null;

  constructor(
    activatedRoute: ActivatedRoute,
    http: HttpClient,
  ) {
    super(activatedRoute, http);

    this.videos = [];
  }

  public ngOnInit(): void {
  }

  protected onLoad(): void {
    this.loadVideos();
  }

  protected loadVideos(): void {
    this.http.get(`${this.apiUri}/video?profileName=${this.profile.name}`).subscribe((videos: Video[]) => {
      this.videos = videos;
    });
  }

}
