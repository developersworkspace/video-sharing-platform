import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.css']
})
export class GetInTouchComponent extends BaseComponent implements OnInit {

  constructor(
    activatedRoute: ActivatedRoute,
    http: HttpClient,
  ) {
    super(activatedRoute, http);
   }

  public ngOnInit(): void {

  }

  public onLoad(): void {

  }

}
