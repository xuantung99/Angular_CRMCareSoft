import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {OpportunityEditComponent} from './opportunity/edit/opportunityEdit.component';
import {PhoneOpportunityComponent} from './opportunity/search/phone-opportunity/phone-opportunity.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {path: 'opportunity/history/:phone', component: PhoneOpportunityComponent},
    {path: 'opportunity/edit/:id', component: OpportunityEditComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
