import {Component} from '@angular/core';
import {AppConstants} from '../@core/utils/app.constants';
import {ApiService} from '../@core/services/api.service';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../@core/utils';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `<ngx-one-column-layout>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>`,
})
export class PagesComponent {
  menu: any = [];
  user: any;
  constructor(private api: ApiService, private authService: NbAuthService, private sidebarService: NbSidebarService,
    private layoutService: LayoutService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
      this.CheckLocalStorage();
  }
  clickOutSide(): void {
    this.sidebarService.compact('menu-sidebar');
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
  CheckLocalStorage() {
    const VERSION_LOCAL = AppConstants.version_local;
        if (localStorage.getItem('version_local') === null) {
            localStorage.setItem('version_local', VERSION_LOCAL);
            window.location.reload();
        } else {
            if (VERSION_LOCAL !== localStorage.getItem('version_local')) {
                localStorage.clear();
                localStorage.setItem('version_local', VERSION_LOCAL);
                window.location.reload();
            }
        }
  }
}
