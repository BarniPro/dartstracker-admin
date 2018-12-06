import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTableModule, MatRadioModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {CompetitionService} from './services/competition.service';
import {MatchService} from './services/match.service';
import {RoundService} from './services/round.service';
import { CompetitionListComponent } from './ui-components/competition/competition-list/competition-list.component';
import { RouterModule, Routes } from '@angular/router';
import {appRoutes} from './services/routes';
import { CompetitionCreateComponent } from './ui-components/competition/competition-create/competition-create.component';
import { CompetitionEditComponent } from './ui-components/competition/competition-edit/competition-edit.component';
import { CompetitionBaseComponent } from './ui-components/competition/competition-base/competition-base.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatchListComponent } from './ui-components/match/match-list/match-list.component';
import { MatchCreateComponent } from './ui-components/match/match-create/match-create.component';
import { MatchEditComponent } from './ui-components/match/match-edit/match-edit.component';
import { MatchBaseComponent } from './ui-components/match/match-base/match-base.component';
import { LoginComponent } from './ui-components/login/login.component';
import { UserListComponent} from './ui-components/user/user-list/user-list.component';
import { UserCreateComponent } from './ui-components/user/user-create/user-create.component';
import { UserEditComponent } from './ui-components/user/user-edit/user-edit.component';
import {RolePipe} from './services/role.pipe';
import { UserBaseComponent } from './ui-components/user/user-base/user-base.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionListComponent,
    CompetitionCreateComponent,
    CompetitionEditComponent,
    CompetitionBaseComponent,
    MatchListComponent,
    MatchCreateComponent,
    MatchEditComponent,
    MatchBaseComponent,
    LoginComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    RolePipe,
    UserBaseComponent
  ],
  imports: [
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule
  ],
  providers: [
    UserService,
    CompetitionService,
    MatchService,
    RoundService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
