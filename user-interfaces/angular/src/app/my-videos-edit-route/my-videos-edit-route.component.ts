import { Component, OnInit, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Video } from '../entities/video';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-videos-edit-route',
  templateUrl: './my-videos-edit-route.component.html',
  styleUrls: ['./my-videos-edit-route.component.css']
})
export class MyVideosEditRouteComponent extends BaseComponent implements OnInit {

  public video: Video = null;

  constructor(
    activatedRoute: ActivatedRoute,
    protected element: ElementRef,
    http: HttpClient,
  ) {
    super(activatedRoute, http);
  }

  public ngOnInit(): void {
  }

  public handleThumbnailUpload(files: FileList): void {
    // TODO: Start

    const file: File = files[0];

    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const result: ArrayBuffer = reader.result as ArrayBuffer;

      const chunkSize = 2000;

      for (let offset = 0; offset < result.byteLength; offset += chunkSize) {
        const data: Uint8Array = new Uint8Array(result.slice(offset, offset + chunkSize - 1));

        this.http.post(`${this.apiUri}/video/thumbnail/append?id=${this.video.id}&offset=${offset}`, Array.from(data)).subscribe(() => {

        });
      }

      // TODO: End
    };

    reader.readAsArrayBuffer(file);
  }

  public handleVideoUpload(files: FileList): void {
    console.log(files);
  }

  public onClickUploadThumbnail(): void {
    this.element.nativeElement.querySelector('#upload-thumbnail[type=file]').click();
  }

  public onClickUploadVideo(): void {
    this.element.nativeElement.querySelector('#upload-video[type=file]').click();
  }

  protected onLoad(): void {
    this.loadVideo();
  }

  protected loadVideo(): void {
    this.http.get(`${this.apiUri}/video?id=${this.activatedRoute.snapshot.params.videoId}`).subscribe((video: Video) => {
      this.video = video;
    });
  }

}
