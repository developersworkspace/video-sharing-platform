import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../entities/video';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-my-videos-new-route',
  templateUrl: './my-videos-new-route.component.html',
  styleUrls: ['./my-videos-new-route.component.css']
})
export class MyVideosNewRouteComponent extends BaseComponent implements OnInit {

  public video: Video = null;

  constructor(
    activatedRoute: ActivatedRoute,
    http: HttpClient,
    protected router: Router,
  ) {
    super(activatedRoute, http);

  }

  public ngOnInit(): void {
  }

  protected onLoad(): void {
    this.video = new Video(null, null, null, null, this.currentProfile.name, null, null, null, null);
  }

  protected onClickSave(): void {
    this.http.post(`${this.apiUri}/video`, this.video, {
      headers: this.getHeaders(),
    }).subscribe((video: Video) => {
      this.router.navigateByUrl(`/${this.profile.name}/my-videos/${video.id}`);
    });
  }

}
