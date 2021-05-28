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


import { AuthGuard } from "../../shared/guard/auth.guard";
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/add-company', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'add-company', component: AddCompanyComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'edit-company/:id', component: EditCompanyComponent },
  {path: 'add-company',component:AddCompanyComponent},
  {path:'company-list',component:CompanyListComponent},
  {path:'events', component:EventsComponent},
  {path:'students',component:StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
