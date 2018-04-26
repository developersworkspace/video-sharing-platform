import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Video } from '../entities/video';

@Component({
  selector: 'app-recent-videos',
  templateUrl: './recent-videos.component.html',
  styleUrls: ['./recent-videos.component.css']
})
export class RecentVideosComponent extends BaseComponent implements OnInit {

  public recentVideos: Video[] = null;

  constructor(
    activatedRoute: ActivatedRoute,
    http: HttpClient,
  ) {
    super(activatedRoute, http);

    this.recentVideos = [];
  }

  public ngOnInit(): void {
    this.loadProfile();
  }

  public onLoad(): void {
    this.loadVideos();
  }

  protected loadVideos(): void {
    this.http.get(`${this.apiUri}/video?profileName=${this.profile.name}`).subscribe((videos: Video[]) => {
      this.recentVideos = videos.slice(0, 2);
    });
  }

}
