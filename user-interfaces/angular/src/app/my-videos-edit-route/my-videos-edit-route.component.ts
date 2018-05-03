import { Component, OnInit, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Video } from '../entities/video';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-videos-edit-route',
  templateUrl: './my-videos-edit-route.component.html',
  styleUrls: ['./my-videos-edit-route.component.css']
})
export class MyVideosEditRouteComponent extends BaseComponent implements OnInit {

  public token: string = null;

  public video: Video = null;

  constructor(
    activatedRoute: ActivatedRoute,
    protected element: ElementRef,
    http: HttpClient,
  ) {
    super(activatedRoute, http);

    this.refreshTokenForUpdate();
  }

  public ngOnInit(): void {
  }

  public handleThumbnailUpload(files: FileList): void {
    const file: File = files[0];

    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const arrayBuffer: ArrayBuffer = reader.result as ArrayBuffer;

      this.uploadThumbnail(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

  public handleVideoUpload(files: FileList): void {
    const file: File = files[0];

    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const arrayBuffer: ArrayBuffer = reader.result as ArrayBuffer;

      this.uploadVideo(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
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

  protected refreshTokenForUpdate(): void {
    this.token = new Date().getTime().toString();
  }

  protected uploadThumbnail(arrayBuffer: ArrayBuffer): void {
    this.http.post(`${this.apiUri}/video/thumbnail/start?id=${this.video.id}`, null).subscribe((startResponse: any) => {
      let requestObservable: Observable<any> = null;

      const chunkSize = 600000;

      for (let offset = 0; offset < arrayBuffer.byteLength; offset += chunkSize) {
        const data: Uint8Array = new Uint8Array(arrayBuffer.slice(offset, offset + chunkSize));

        const observable: Observable<any> = this.http.post(`${this.apiUri}/video/thumbnail/append?id=${this.video.id}&offset=${offset}`,
          Array.from(data));

        if (!requestObservable) {
          requestObservable = observable;

          continue;
        }

        requestObservable = requestObservable.pipe(mergeMap((value) => observable));
      }

      requestObservable.subscribe(() => {
        this.http.post(`${this.apiUri}/video/thumbnail/end?id=${this.video.id}`, null).subscribe((endResponse: any) => {
          this.video.thumbnailLocation = endResponse;

          this.refreshTokenForUpdate();
        });
      });
    });
  }

  protected uploadVideo(arrayBuffer: ArrayBuffer): void {
    this.http.post(`${this.apiUri}/video/start?id=${this.video.id}`, null).subscribe((startResponse: any) => {
      let requestObservable: Observable<any> = null;

      const chunkSize = 600000;

      for (let offset = 0; offset < arrayBuffer.byteLength; offset += chunkSize) {
        const data: Uint8Array = new Uint8Array(arrayBuffer.slice(offset, offset + chunkSize));

        const observable: Observable<any> = this.http.post(`${this.apiUri}/video/append?id=${this.video.id}&offset=${offset}`,
          Array.from(data));

        if (!requestObservable) {
          requestObservable = observable;

          continue;
        }

        requestObservable = requestObservable.pipe(mergeMap((value) => observable));
      }

      requestObservable.subscribe(() => {
        this.http.post(`${this.apiUri}/video/end?id=${this.video.id}`, null).subscribe((endResponse: any) => {
          this.video.thumbnailLocation = endResponse;

          this.refreshTokenForUpdate();
        });
      });
    });
  }

}
