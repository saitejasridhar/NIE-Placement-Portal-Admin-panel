import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material.module';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  
import {NgxPaginationModule} from 'ngx-pagination';


// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AngularFireStorageModule } from "@angular/fire/storage";


// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import {  AngularFirestoreModule ,AngularFirestore} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { Ng2SmartTableModule } from 'ng2-smart-table';


// Auth service
import { AuthService } from "./shared/services/auth.service";
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';

import { FormsModule} from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { CompanyService } from './shared/company.service';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EventsComponent } from './components/events/events.component';
import { StudentsComponent } from './components/students/students.component';




@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AddCompanyComponent,
    CompanyListComponent,
    EditCompanyComponent,
    NavBarComponent,
    EventsComponent,
    StudentsComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularMaterialModule,
    RichTextEditorAllModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,

  ],
  providers: [AuthService,CompanyService,AngularFirestore],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }

