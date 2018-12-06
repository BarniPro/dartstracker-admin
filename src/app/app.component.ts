import {Component, OnInit} from '@angular/core';
import {UserModel} from './models/user.model';
import User = UserModel.User;
import {UserService} from './services/user.service';
import {CompetitionService} from './services/competition.service';
import {CompetitionModel} from './models/competition.model';
import Competition = CompetitionModel.Competition;
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[] = [];
  competitions: Competition[] = [];

  title = 'dartstracker-ui';

  constructor(private userService: UserService,
              private competitionService: CompetitionService,
              private router: Router) {}

  ngOnInit(): void {
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
