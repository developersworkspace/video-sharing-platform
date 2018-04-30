import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';
import { Profile } from '../entities/profile';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.css']
})
export class ProfileRouteComponent extends BaseComponent implements OnInit {

  constructor(
    activatedRoute: ActivatedRoute,
    http: HttpClient,
  ) {
    super(activatedRoute, http);
  }

  public ngOnInit(): void {
  }

  public onClickSaveProfile(): void {
    this.http.put(`${this.apiUri}/profile`, this.currentProfile, {
      headers: this.getHeaders(),
    }).subscribe((profile: Profile) => {
      this.currentProfile = profile;
    });
  }

  public onClickSaveUser(): void {
    this.http.put(`${this.apiUri}/user`, this.currentUser, {
      headers: this.getHeaders(),
    }).subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  protected onLoad(): void {
  }

}
