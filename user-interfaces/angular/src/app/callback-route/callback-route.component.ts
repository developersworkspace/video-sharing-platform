import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-callback-route',
  templateUrl: './callback-route.component.html',
  styleUrls: ['./callback-route.component.css']
})
export class CallbackRouteComponent implements OnInit {

  public apiUri = environment.uri;

  constructor(
    protected http: HttpClient,
    protected router: Router,
  ) {

  }

  public ngOnInit() {
    const accessToken = new RegExp(/access_token=([^&]*)/g).exec(window.location.hash)[1];

    const state = new RegExp(/state=([^&]*)/g).exec(window.location.hash)[1];

    this.http.get(`${this.apiUri}/auth/auth0?token=${accessToken}`).subscribe((response: any) => {
      localStorage.setItem('jwt', response);

      this.router.navigateByUrl(state);
    });
  }

}
