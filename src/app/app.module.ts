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
  MatIconModule, MatListModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {CompetitionService} from './services/competition.service';
import {MatchService} from './services/match.service';
import {RoundService} from './services/round.service';
import { CompetitionListComponent } from './ui-components/competition/competition-list/competition-list.component';
import { RouterModule, Routes } from '@angular/router';
import {appRoutes} from './services/routes';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionListComponent
  ],
  imports: [
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
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
