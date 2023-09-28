import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class InterceptService implements HttpInterceptor {
  private authService: NbAuthService;

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(NbAuthService);
    return this.authService.isAuthenticatedOrRefresh().pipe(
      switchMap(authenticated => {
        if (authenticated) {
          return this.authService.getToken().pipe(
            switchMap((token: NbAuthToken) => {
              const JWT = `Bearer ${token.getValue()}`;
              req = req.clone({
                setHeaders: {
                  Authorization: JWT,
                },
              });
              return next.handle(req);
            }));
        } else {
          return next.handle(req);
        }
      }));
  }
}
