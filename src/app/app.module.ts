import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ScrollToModule } from 'ng2-scroll-to';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule } from '@angular2-material/card';
import { MdProgressSpinnerModule,
         MdInputModule,
         MdCheckboxModule,
         MdListModule,
         MdGridListModule,
         MdDialogModule} from '@angular/material';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdIconRegistry } from '@angular2-material/icon';
import 'hammerjs';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';

// Components
import { AppComponent } from './app.component';
import { PasswordValidationComponent } from './components/password-validation/password-validation.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Services
import { FirebaseService,
         UserDisabledDialog,
         UserNotFoundDialog,
         WrongPasswordDialog,
         UserExistsDialog,
         RegisterSuccessDialog } from './services/firebase.service';

firebase.initializeApp(environment.firebase);

// Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    PasswordValidationComponent,
    UserDisabledDialog,
    UserExistsDialog,
    UserNotFoundDialog,
    WrongPasswordDialog,
    UserExistsDialog,
    RegisterSuccessDialog
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ScrollToModule.forRoot(),
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdInputModule,
    MdCheckboxModule,
    MdListModule,
    MdGridListModule,
    MdDialogModule
  ],
  providers: [ FirebaseService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ UserExistsDialog,
                     RegisterSuccessDialog,
                     WrongPasswordDialog,
                     UserNotFoundDialog,
                     UserDisabledDialog ]
})
export class AppModule { }
