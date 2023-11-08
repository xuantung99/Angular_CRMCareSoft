import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthJWTToken, NbAuthModule, NbAuthService, NbPasswordAuthStrategy} from '@nebular/auth';
import {tap} from 'rxjs/operators';
import {PreviousRouteService} from './@core/services/previousRouteService';
@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: NbAuthService, private router: Router, private previousRoute: PreviousRouteService) {}
    canActivate() {
        return this.authService.isAuthenticated().pipe(tap(authenticated => {
          if (!authenticated) {
            // console.log(this.previousRoute.previousRoutePath.value);
              localStorage.removeItem('menu_setting');
              localStorage.removeItem('role_setting');
            this.router.navigate([`auth/login`]);
          }
        }));
    }
}

// export const coreProvider = (path) => {
//   return [
//     ...NbAuthModule.forRoot({
//       strategies: [
//         NbPasswordAuthStrategy.setup({
//           name: 'email',
//           token: {
//             class: NbAuthJWTToken,
//             key: 'data.token',
//           },
//           messages: {
//             key: 'message',
//             getter: jwtGetter,
//           },
//           errors: {
//             getter: errorGetter,
//           },
//           login: {
//             endpoint: 'login',
//             method: 'post',
//             redirect: {
//               success: `/`,
//               failure: null,
//             },
//             requireValidToken: true,
//           },
//           logout: {
//             endpoint: 'logout',
//             method: 'get',
//             redirect: {
//               success: '/auth/login',
//               failure: '/',
//             }
//           }
//         })
//       ],
//     }).providers,
//     NbSecurityModule.forRoot({
//       accessControl: {
//         guest: {
//           view: '*',
//         },
//         user: {
//           parent: 'guest',
//           create: '*',
//           edit: '*',
//           remove: '*',
//         },
//       },
//     }).providers,
//     {provide: NbRoleProvider, useClass: NbSimpleRoleProvider}, LayoutService, StateService,
//   ];
// }

