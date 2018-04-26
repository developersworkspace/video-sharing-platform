import { Component, OnInit } from '@angular/core';
import { Video } from '../entities/video';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent implements OnInit {

  public apiUri = 'http://localhost:3000/api';

  public latestVideo: Video = null;

  public profile: Profile = null;

  public recentVideos: Video[] = null;

  public user: User = null;

  public videos: Video[] = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
  ) {
    this.recentVideos = [];

    this.videos = [];
  }

  public ngOnInit(): void {
    this.loadProfile();
  }

  protected loadProfile(): void {
    this.http.get(`${this.apiUri}/profile?name=${this.activatedRoute.snapshot.params.profileName}`).subscribe((profile: Profile) => {
      this.profile = profile;

      this.loadUser();

      this.loadVideos();
    });
  }

  protected loadUser(): void {
    this.http.get(`${this.apiUri}/user?id=${this.profile.userId}`).subscribe((user: User) => {
      this.user = user;
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
