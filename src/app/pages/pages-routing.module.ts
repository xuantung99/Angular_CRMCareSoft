import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {FormOrderComponent} from './opportunity/edit/form-order.component';
import {PhoneComponent} from './opportunity/search/phone/phone.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {path: 'opportunity/history/:phone', component: PhoneComponent},
    {path: 'opportunity/edit/:id', component: FormOrderComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
