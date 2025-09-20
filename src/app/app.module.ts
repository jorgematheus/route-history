import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { InstitutionalComponent } from './institutional/institutional.component';
import { DetailsComponent } from './institutional/details/details.component';
import { PaymentEvolutionComponent } from './payment-evolution/payment-evolution.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    InstitutionalComponent,
    DetailsComponent,
    PaymentEvolutionComponent,
    ContractDetailsComponent,
    AdvancePaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
