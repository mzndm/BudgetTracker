import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService} from "./auth.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authUser = JSON.parse(localStorage.getItem(environment.userKey)!);
    const token = authUser?.accessToken;
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}


@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
              const clonedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token.accessToken}` }
              });
              return next.handle(clonedReq);
            }),
          );
        }
        /* {
          catchError((err) => {
            console.log('logout', err);
            this.authService.logout();
            return throwError(() => new Error('Session expired. Please log in again.'));
          })
        } */

        return throwError(() => error);
      })
    );
  }
}
