import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {PhoneComponent} from './search/phone/phone.component';
import {OpportunityComponent} from './opportunity.component';
import {ShowPromotionComponent} from './show-promotion/showPromotion.component';
import {InsertOppComponent} from './import/insertOpp.component';
import {FormOrderComponent} from './edit/form-order.component';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTimepickerModule,
  NbUserModule,
  NbWindowModule,
} from '@nebular/theme';

import {NbDateFnsDateModule} from '@nebular/date-fns';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {InterceptService} from '../../@core/services/intercept.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbSpinnerModule,
    NbDateFnsDateModule,
    NbButtonModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbActionsModule,
    NbAlertModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NbTimepickerModule,
    NbWindowModule.forChild(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forChild({format: 'dd-MM-yyyy'}),
  ],
  declarations: [
    OpportunityComponent,
FormOrderComponent,
    ShowPromotionComponent,
    InsertOppComponent,
    PhoneComponent,
  ],
  entryComponents: [
    ShowPromotionComponent,
    InsertOppComponent,
  ],

  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
  ],
})

export class OpportunityModule {}
