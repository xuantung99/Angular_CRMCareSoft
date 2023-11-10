import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {tap} from 'rxjs/operators';
import {PreviousRouteService} from './@core/services/previousRouteService';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router, private previousRoute: PreviousRouteService) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(tap(authenticated => {
        if (!authenticated) {
          // console.log(this.previousRoute.previousRoutePath.value);
          localStorage.removeItem('menu_setting');
          localStorage.removeItem('role_setting');
          this.router.navigate([`auth/login`], {
            queryParams: {url: this.previousRoute.previousRoutePath.value}
          })
        }
      }
    ))
  }
}
