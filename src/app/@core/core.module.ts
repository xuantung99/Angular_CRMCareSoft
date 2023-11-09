import {NgModule, Optional, SkipSelf} from '@angular/core';
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

// const route =  new URLSearchParams(window.location.search).get('url')
// console.log(route);

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

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): any {
    return {
      ngModule: CoreModule,
      providers: coreProviders(),
    };
  }
}

const coreProviders = () => {
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
              success: `${new URLSearchParams(window.location.search).get('url')}`,
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
};
