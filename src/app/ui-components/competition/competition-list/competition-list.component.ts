import { Component, OnInit } from '@angular/core';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitionModel} from '../../../models/competition.model';
import Competition = CompetitionModel.Competition;
import {countryList} from '../../../services/country';
import {Router} from '@angular/router';
import {UserModel} from '../../../models/user.model';
import User = UserModel.User;
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService,
              private router: Router,
              private authService: AuthService) { }

  hasRight(rightName: string) {
    return this.authService.hasRight(rightName);
  }

  ngOnInit() {
    this.loadCompetitions();
  }

  private loadCompetitions() {
    this.competitionService.get().subscribe((competitions) => {
      this.competitions = competitions;
    });
  }

  deleteCompetition(id: number) {
    this.competitionService.removeOfficials({
      competition_id: id
    }).subscribe(() => {
      this.competitionService.delete({
        id: id
      }).subscribe( () => {
        this.loadCompetitions();
      });
    });
  }

  getCountryIconClass(name: string): any {
    const country = countryList.find(c => c.name === name);
    if (country) {
      const ret = 'flag-icon-' + country.code.toLocaleLowerCase();
      return ret;
    }
  }

  getOfficialNames(officials: User[]): string {
    const official_names: string[] = [];
    officials.forEach((official) => {
      official_names.push(official.human_name);
    });
    return official_names.join(', ');
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
