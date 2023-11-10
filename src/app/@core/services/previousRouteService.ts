import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class PreviousRouteService {
  private previousUrl: string;
  private currentUrl: string;
  constructor(router: Router) {
    this.currentUrl = router?.url;
    router?.events?.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl() {
    console.log(this.previousUrl);
    return this.previousUrl;
  }
}
