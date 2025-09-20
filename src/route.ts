import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { InstitutionalComponent } from './app/institutional/institutional.component';
import { DetailsComponent } from './app/institutional/details/details.component';
import { AdvancePaymentComponent } from './app/advance-payment/advance-payment.component';
import { ContractDetailsComponent } from './app/contract-details/contract-details.component';
import { PaymentEvolutionComponent } from './app/payment-evolution/payment-evolution.component';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'institutional', component: InstitutionalComponent },
    { path: 'institutional-details', component: DetailsComponent },
    { path: 'advance-payment', component: AdvancePaymentComponent },
    { path: 'contract-details', component: ContractDetailsComponent },
    { path: 'payment-evolution', component: PaymentEvolutionComponent },
    { path: '**', component: HomeComponent }
];