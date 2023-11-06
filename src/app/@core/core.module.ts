import {ModuleWithProviders, inject, NgModule, Optional, SkipSelf} from '@angular/core';
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
class PreviousRoute {
  prevRoutePath: string;
  constructor(prevService: PreviousRouteService) {
     this.prevRoutePath = prevService?.previousRoutePath.value;
    console.log(this.prevRoutePath);
  }
}
let prevRouteService = new PreviousRoute();
console.log(prevRouteService.prevRoutePath);

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

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS
      ],
    };
  }
}
