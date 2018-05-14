import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../entities/profile';
import { mergeMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';

export abstract class BaseComponent {

  public apiUri = environment.uri;

  public authenticated = false;

  public currentProfile: Profile = null;

  public currentUser: User = null;

  public profile: Profile = null;

  public subscriptionPaid = null;

  public token: string = null;

  public user: User = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
  ) {
    this.authenticated = localStorage.getItem('jwt') ? true : false;

    this.token = localStorage.getItem('jwt');

    if (this.authenticated) {
      const observable: Observable<[User, Profile, User]> = forkJoin(
        this.loadProfileAndUserAndSubscriptionPaid(),
        this.loadCurrentProfile(),
        this.loadCurrentUser(),
      );

      observable.subscribe((val: any[]) => {
        this.onLoad();
      });
    } else {
      this.loadProfileAndUserAndSubscriptionPaid().subscribe((user: User) => {
        this.onLoad();
      });
    }
  }

  protected abstract onLoad(): void;

  protected getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('jwt');

    if (!token) {
      return new HttpHeaders();
    }

    const headers: HttpHeaders = new HttpHeaders({
      authorization: `bearer ${token}`,
    });

    return headers;
  }

  protected loadCurrentProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUri}/profile`, {
      headers: this.getHeaders(),
    }).pipe(tap((profile: Profile) => {
      this.currentProfile = profile;
    }));
  }

  protected loadCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUri}/user`, {
      headers: this.getHeaders(),
    }).pipe(tap((user: User) => {
      this.currentUser = user;
    }));
  }

  protected loadProfileAndUserAndSubscriptionPaid(): Observable<any> {
    return this.http.get<Profile>(`${this.apiUri}/profile?name=${this.activatedRoute.snapshot.params.profileName}`)
      .pipe(mergeMap((profile: Profile) => {
        this.profile = profile;

        return this.http.get<User>(`${this.apiUri}/user?id=${this.profile.userId}`);
      })).pipe(tap((user: User) => {
        this.user = user;
      })).pipe(mergeMap(() => {
        if (this.authenticated) {
          return this.http.get<boolean>(`${this.apiUri}/subscription/ispaid?profileName=${this.profile.name}`, {
            headers: this.getHeaders(),
          });
        } else {
          return Observable.of(null);
        }
      })).pipe(tap((subscriptionPaid: boolean) => {
        // TODO:
        // this.subscriptionPaid = subscriptionPaid;
        this.subscriptionPaid = true;
      }));
  }
}
