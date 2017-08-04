import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router'
import { ScrollToModule } from 'ng2-scroll-to'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdCardModule } from '@angular2-material/card'
import {
  MdProgressSpinnerModule,
  MdInputModule,
  MdCheckboxModule,
  MdListModule,
  MdGridListModule,
  MdDialogModule,
  MdSidenavModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSelectModule,
  MdTooltipModule,
  DateAdapter,
  NativeDateAdapter
} from '@angular/material'
import { MdButtonModule } from '@angular2-material/button'
import { MdIconRegistry } from '@angular2-material/icon'
import 'hammerjs'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environments/environment'
import * as firebase from 'firebase'
import { AppComponent } from './app.component'
import { PasswordValidationComponent } from './components/password-validation/password-validation.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import {
  FirebaseService,
  UserDisabledDialog,
  UserNotFoundDialog,
  WrongPasswordDialog,
  UserExistsDialog,
  RegisterSuccessDialog
} from './services/firebase.service'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { IssuesComponent } from './components/issues/issues.component'
import { AddIssueModalComponent } from './components/modals/add-issue-modal/add-issue-modal.component'
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg'
import { NotesComponent } from './components/notes/notes.component'
import { CalendarComponent } from './components/calendar/calendar.component'
import { ContactsComponent } from './components/contacts/contacts.component'
import { DeleteIssueModalComponent } from './components/modals/delete-issue-modal/delete-issue-modal.component';
import { DerpPipePipe } from './pipes/derp-pipe.pipe';

firebase.initializeApp(environment.firebase)

// Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'issues', component: IssuesComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'calendar', component: CalendarComponent }
]

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
    RegisterSuccessDialog,
    SidenavComponent,
    IssuesComponent,
    AddIssueModalComponent,
    NotesComponent,
    CalendarComponent,
    ContactsComponent,
    DeleteIssueModalComponent,
    DerpPipePipe
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
    MdDialogModule,
    MdSidenavModule,
    MdToolbarModule,
    MdMenuModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTooltipModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
  entryComponents: [UserExistsDialog,
    RegisterSuccessDialog,
    WrongPasswordDialog,
    UserNotFoundDialog,
    UserDisabledDialog,
    AddIssueModalComponent,
    DeleteIssueModalComponent]
})
export class AppModule { }
