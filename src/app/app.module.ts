import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {CompetitionService} from './services/competition.service';
import {MatchService} from './services/match.service';
import {RoundService} from './services/round.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
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
