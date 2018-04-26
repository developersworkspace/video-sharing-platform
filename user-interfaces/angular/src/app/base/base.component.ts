import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../entities/profile';

export abstract class BaseComponent {

  public apiUri = 'http://localhost:3000/api';

  public authenticated = false;

  public profile: Profile = null;

  // TODO: Set from Service
  public subscriptionPaid = true;

  public token: string = null;

  public user: User = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
  ) {
    this.authenticated = localStorage.getItem('jwt') ? true : false;

    this.token = localStorage.getItem('jwt');

    this.loadProfile();
  }

  public abstract onLoad(): void;

  protected getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('jwt');

    const headers: HttpHeaders = new HttpHeaders({
      authorization: `bearer ${token}`,
    });

    return headers;
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
