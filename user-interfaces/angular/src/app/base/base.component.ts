import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../entities/profile';

export abstract class BaseComponent {

  public apiUri = 'http://localhost:3000/api';

  public authenticated = false;

  public profile: Profile = null;

  // TODO: Set from Service
  public subscriptionPaid = false;

  public user: User = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
  ) {
    this.loadProfile();

    this.authenticated = localStorage.getItem('jwt') ? true : false;
  }

  public abstract onLoad(): void;

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
