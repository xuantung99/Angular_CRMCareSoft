import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'ngx-show-description',
  template: `
    <div class="description-wrap" [innerHTML]="showD(value)"></div>
  `,
})

export class ShowDescriptionComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: any;
  constructor(private router: Router) {}
  showD(v) : string {
    if (v && v.length > 900) {
      return v.split(' ').slice(0, 200).join(' ') + ' ...';
    } else {
      return v;
    }
  }
}
