import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { AddCompanyComponent } from '../../components/add-company/add-company.component';
import { CompanyListComponent } from '../../components/company-list/company-list.component';
import { EditCompanyComponent } from '../../components/edit-company/edit-company.component';
import {EventsComponent} from '../../components/events/events.component';
import { StudentsComponent} from '../../components/students/students.component'
import { CompanyDetailsComponent } from '../../components/company-details/company-details.component'
import { HistoryComponent } from '../../components/history/history.component'
import {CompanyHistoryComponent } from '../../components/company-history/company-history.component'


import { AuthGuard } from "../../shared/guard/auth.guard";
import { TicketsComponent } from 'src/app/components/tickets/tickets.component';
import { InsightsComponent } from 'src/app/components/insights/insights.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, },
  { path: 'register-user', component: SignUpComponent,},
  { path: 'add-company', component: AddCompanyComponent , canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent ,},
  { path: 'verify-email-address', component: VerifyEmailComponent, },
  { path: 'edit-company/:id', component: EditCompanyComponent, canActivate: [AuthGuard] },
  {path:'company-list',component:CompanyListComponent, canActivate: [AuthGuard]},
  {path:'events', component:EventsComponent, canActivate: [AuthGuard]},
  {path:'students',component:StudentsComponent, canActivate: [AuthGuard]},
  {path:'company-details/:id',component:CompanyDetailsComponent, canActivate: [AuthGuard]},
  {path:'history',component:HistoryComponent, canActivate: [AuthGuard]},
  {path:'history/:id',component:CompanyHistoryComponent, canActivate: [AuthGuard]},
  {path:'studenttickets',component:TicketsComponent, canActivate: [AuthGuard]},
  {path:'home',component:InsightsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
