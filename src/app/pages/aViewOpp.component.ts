import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'ngx-opp-a-view',
  template: `
    <a routerLink="/marketing/ticket/view/{{value}}">{{value}}</a>
  `,
})

export class AViewOppComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: any;
  constructor(private router: Router) {}
}
