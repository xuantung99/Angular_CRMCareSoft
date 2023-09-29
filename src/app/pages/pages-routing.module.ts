import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {OpportunityEditComponent} from './opportunity/edit/opportunityEdit.component';
import {OpportunitySearchComponent} from './opportunity/search/opportunitySearch.component';
import {PhoneSearchComponent} from './opportunity/search/phone-search/phone-search.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {path: 'opportunity/history/:phone', component: PhoneSearchComponent},
    // {path: 'opportunity', component: OpportunityComponent},
    {path: 'opportunity/search', component: OpportunitySearchComponent},
    {path: 'opportunity/edit/:id', component: OpportunityEditComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
