import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {NbMenuModule, NbSpinnerModule} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import {AOppViewComponent} from './aOppView.component';
import {AViewOppComponent} from './aViewOpp.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {OpportunityModule} from './opportunity/opportunity.module';
import {ShowDescriptionComponent} from './showDescription.component';
import { ClickOutsideDirective } from './ClickedOutside.Directive';
import { OrderComponent } from './order/order.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    RouterModule,
    ThemeModule,
    NbMenuModule,
    NbSpinnerModule,
    MiscellaneousModule,
    OpportunityModule,
  ],
  declarations: [
    PagesComponent,
    AOppViewComponent,
    AViewOppComponent,
    ShowDescriptionComponent,
    ClickOutsideDirective,
    OrderComponent,
  ],
})
export class PagesModule {
}
