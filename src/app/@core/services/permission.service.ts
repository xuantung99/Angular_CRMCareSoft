import {Injectable} from '@angular/core';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {NotiService} from './noti.service';

@Injectable({providedIn: 'root'})

export class PermissionService {
  constructor(private router: Router, private authService: NbAuthService, private notiService: NotiService) {
  }

  canAccess(module: string, action: string, method: string = '') {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        const user = token.getPayload();
        const mod = user.scopes.filter(x => x.module.toLowerCase() === module.toLowerCase());
        if (mod.length === 0) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          const checkA = mod.filter(x => x.scope === '*');
          if (checkA.length === 0) {
            const check = (method === '') ? mod.filter(x => x.scope.toLowerCase() === action.toLowerCase()) :
              mod.filter(x => x.scope.toLowerCase() === action.toLowerCase()
                && x.method.toLowerCase() === method.toLowerCase());
            if (check.length === 0) {
              this.notiService.error('YOU_DONT_HAVE_PERMISSION');
              this.router.navigate(['/dashboard']);
              return false;
            }
          }
        }
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
    });
  }

  can(module: string, action: string, method: string = '') {
    return new Promise(resolve => {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          const user = token.getPayload();
          const mod = user.scopes.filter(x => x.module.toLowerCase() === module.toLowerCase());
          if (mod.length === 0) {
            resolve(false);
            return false;
          } else {
            const checkA = mod.filter(x => x.scope === '*');
            if (checkA.length === 0) {
              const check = (method === '') ? mod.filter(x => x.scope.toLowerCase() === action.toLowerCase()) :
                mod.filter(x => x.scope.toLowerCase() === action.toLowerCase()
                  && x.method.toLowerCase() === method.toLowerCase());
              if (check.length === 0) {
                resolve(false);
                return false;
              }
            }
          }
          resolve(true);
          return true;
        } else {
          resolve(false);
          return false;
        }
      });
    });
  }
}
