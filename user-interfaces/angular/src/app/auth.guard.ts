import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  protected clientId = 'CZ5i4EtEMua0Myv08pZlen35d4aiE7n0';

  protected host = 'https://developersworkspace.auth0.com';

  protected redirectUri = 'http://localhost:4200/callback';

  constructor(
    protected activatedRoute: ActivatedRoute,
  ) {

  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token: string = localStorage.getItem('jwt');

    if (token) {
      return true;
    }

    // tslint:disable-next-line:max-line-length
    window.location.href = `${this.host}/authorize?response_type=token&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${state.url}`;

    return false;
  }

}
