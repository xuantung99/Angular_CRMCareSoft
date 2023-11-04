import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuService, NbIconLibraries} from '@nebular/theme';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {AppConstants} from './@core/utils/app.constants';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private iconLibraries: NbIconLibraries,
  ) {
    this.iconLibraries.registerFontPack('font-awesome', {packClass: 'fa', iconClassPrefix: 'fa'});
    this.menuService.onItemClick().subscribe((event) => {this.onContextItemSelection(event.item.title)});
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {});
  }
  onContextItemSelection(title) {
    if (title === 'Log out') {
      localStorage.clear();
      this.router.navigate(['/auth/logout']);
      const VERSION_LOCAL = AppConstants.version_local;
      localStorage.setItem('version_local', VERSION_LOCAL);
    }
  }
}
