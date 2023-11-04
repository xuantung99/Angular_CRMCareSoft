import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NbAuthModule} from '@nebular/auth';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptService} from './@core/services/intercept.service';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {AuthGuard} from './auth-guard.service';
import {environment} from '../environments/environment';
import {NbChatModule, NbDatepickerModule,NbDialogModule,NbMenuModule,NbSidebarModule, NbTimepickerModule,NbToastrModule,NbWindowModule} from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { Globals } from './@core/utils/globals';
import { NgModule } from '@angular/core';
import {PreviousRouteService} from './@core/services/previousRouteService';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'dd-MM-yyyy' }),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbAuthModule,
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: environment.baseUrl},
    AuthGuard,
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
    Globals,
  ],
})

export class AppModule {
}
