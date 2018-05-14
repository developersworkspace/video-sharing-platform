import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent extends BaseComponent implements OnInit {

  constructor(
    activatedRoute: ActivatedRoute,
    http: HttpClient,
  ) {
    super(activatedRoute, http);
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    location.reload();
  }

  protected onLoad(): void {

  }

}
