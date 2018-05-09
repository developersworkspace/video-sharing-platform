import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../entities/profile';

export abstract class BaseComponent {

  public apiUri = 'http://localhost:3000/api';

  public authenticated = false;

  public currentProfile: Profile = null;

  public currentUser: User = null;

  public profile: Profile = null;

  // TODO: Set from Service
  public subscriptionPaid = false;

  public token: string = null;

  public user: User = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
  ) {
    this.authenticated = localStorage.getItem('jwt') ? true : false;

    this.token = localStorage.getItem('jwt');

    this.loadCurrentProfile();
    this.loadCurrentUser();

    this.loadProfile();
  }

  protected abstract onLoad(): void;

  protected getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('jwt');

    const headers: HttpHeaders = new HttpHeaders({
      authorization: `bearer ${token}`,
    });

    return headers;
  }

  protected loadCurrentProfile(): void {
    this.http.get(`${this.apiUri}/profile`, {
      headers: this.getHeaders(),
    }).subscribe((profile: Profile) => {
      this.currentProfile = profile;
    });
  }

  protected loadCurrentUser(): void {
    this.http.get(`${this.apiUri}/user`, {
      headers: this.getHeaders(),
    }).subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  protected loadProfile(): void {
    this.http.get(`${this.apiUri}/profile?name=${this.activatedRoute.snapshot.params.profileName}`).subscribe((profile: Profile) => {
      this.profile = profile;

      this.loadUser();
    });
  }

  protected loadUser(): void {
    this.http.get(`${this.apiUri}/user?id=${this.profile.userId}`).subscribe((user: User) => {
      this.user = user;

      this.onLoad();
    });
  }

}
