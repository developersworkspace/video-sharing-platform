import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ) {
    super(activatedRoute, http);

  }

  public ngOnInit(): void {
  }

  protected onLoad(): void {
    this.video = new Video(null, null, null, null, this.profile.name, null, null, null, null);
  }


}
