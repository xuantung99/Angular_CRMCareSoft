import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {OpportunityComponent} from './opportunity/opportunity.component';
import {OpportunityEditComponent} from './opportunity/edit/opportunityEdit.component';
import {OpportunitySearchComponent} from './opportunity/search/opportunitySearch.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {path: 'opportunity/history/:phone', component: OpportunitySearchComponent},
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
