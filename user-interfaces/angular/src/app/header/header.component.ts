import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

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
