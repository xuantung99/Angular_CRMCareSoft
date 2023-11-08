import {Injectable, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken} from '@nebular/auth';
import {NbSecurityModule, NbRoleProvider} from '@nebular/security';
import {of as observableOf} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {
  LayoutService,
  StateService,
} from './utils';
import {PreviousRouteService} from './services/previousRouteService';
export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    return observableOf('guest');
  }
}
export function jwtGetter(module, res, options) {
  if (res.body.responseCode !== '00') {
    return res.body.message ? res.body.message : options[module].defaultErrors;
  }
}
export function errorGetter(module: string, res: HttpErrorResponse) {
  return [res.message];
}

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})

@Injectable({ providedIn: 'root' })
export class CoreModule {
 public static prevRoutePath: string;
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, prevService: PreviousRouteService) {
    this['prevRoutePath'] = prevService.previousRoutePath.value;
    // console.log("In constructor: ", this['prevRoutePath']);
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 public static forRoot() {
    // console.log("In forRoot: ", this['prevRoutePath']);
    return {
      ngModule: CoreModule,
      providers: coreProviders('/'),
    };
  }
}

const coreProviders = (path) => {
  return [
   ...NbAuthModule.forRoot({
     strategies: [
       NbPasswordAuthStrategy.setup({
         name: 'email',
         token: {
           class: NbAuthJWTToken,
           key: 'data.token',
         },
         messages: {
           key: 'message',
           getter: jwtGetter,
         },
         errors: {
           getter: errorGetter,
         },
         login: {
           endpoint: 'login',
           method: 'post',
           redirect: {
             success: `${path}`,
             failure: null,
           },
           requireValidToken: true,
         },
         logout: {
           endpoint: 'logout',
           method: 'get',
           redirect: {
             success: '/auth/login',
             failure: '/',
           }
         }
       })
     ],
   }).providers,
   NbSecurityModule.forRoot({
     accessControl: {
       guest: {
         view: '*',
       },
       user: {
         parent: 'guest',
         create: '*',
         edit: '*',
         remove: '*',
       },
     },
   }).providers,
   {provide: NbRoleProvider, useClass: NbSimpleRoleProvider}, LayoutService, StateService,
 ];
}

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'data.token',
        },
        messages: {
          key: 'message',
          getter: jwtGetter,
        },
        errors: {
          getter: errorGetter,
        },
        login: {
          endpoint: 'login',
          method: 'post',
          redirect: {
            success: `/`,
            failure: null,
          },
          requireValidToken: true,
        },
        logout: {
          endpoint: 'logout',
          method: 'get',
          redirect: {
            success: '/auth/login',
            failure: '/',
          }
        }
      })
    ],
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {provide: NbRoleProvider, useClass: NbSimpleRoleProvider}, LayoutService, StateService,
];
