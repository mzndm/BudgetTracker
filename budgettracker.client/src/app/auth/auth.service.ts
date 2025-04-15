import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Login, Register, AuthUser } from '../shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSource = new ReplaySubject<AuthUser | null>(1);
  user$ = this.userSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  register(model: Register) {
    return this.http.post(`/auth/register`, model);
  }

  login(model: Login) {
    return this.http.post<AuthUser>(`/auth/login`, model)
    .pipe(
      map((user: AuthUser) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    // return this.http.post(`/auth/logout`, null);
    window.location.href = '/auth';
  }

  isLoggedIn(): boolean | null {
    const token = JSON.parse(localStorage.getItem(environment.userKey)!)?.accessToken;

    return !!token
  }

  refreshToken(): Observable<any> {
    const refreshToken = JSON.parse(localStorage.getItem(environment.userKey)!)?.refreshToken;
    return this.http.post<AuthUser>(`/auth/refresh`, { refreshToken })
      .pipe(
        map((user: AuthUser) => {
          if (user) {
            this.setUser(user);
          }
        })
      )
  }

  private setUser(user: AuthUser) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
}
