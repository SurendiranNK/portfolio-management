import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { InvestmentFormComponent } from './component/investment-form/investment-form.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }, 
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'investment-form',
        component: InvestmentFormComponent
      },
    
];
