import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'ngx-opp-a-iew',
  template: `
    <a routerLink="/opportunity/edit/{{value}}">{{value}}</a>
  `,
})

export class AOppViewComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: any;
  constructor(private router: Router) {}
}
