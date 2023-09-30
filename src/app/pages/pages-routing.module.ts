import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {EditComponent} from './opportunity/edit/edit.component';
import {PhoneComponent} from './opportunity/search/phone/phone.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {path: 'opportunity/history/:phone', component: PhoneComponent},
    {path: 'opportunity/edit/:id', component: EditComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
