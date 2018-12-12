import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchModel} from '../../../models/match.model';
import Match = MatchModel.Match;
import {MatchService} from '../../../services/match.service';
import {countryList} from '../../../services/country';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matches: Match[] = [];
  competition_id: number;

  constructor(private matchService: MatchService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  hasRight(rightName: string) {
    return this.authService.hasRight(rightName);
  }

  ngOnInit() {
    this.competition_id = +this.activatedRoute.snapshot.paramMap.get('competition_id');
    this.loadMatches();
  }

  private loadMatches() {
    this.matchService.get({
      competition_id: this.competition_id
    }).subscribe((matches) => {
      this.matches = matches;
      console.log(this.matches);
    });
  }

  getCountryIconClass(name: string): any {
    const country = countryList.find(c => c.name === name);
    if (country) {
      const ret = 'flag-icon-' + country.code.toLocaleLowerCase();
      return ret;
    }
  }

  deleteMatch(id: number) {
    this.matchService.delete({
      competition_id: this.competition_id,
      id: id
    }).subscribe(() => {
      this.loadMatches();
    });
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
