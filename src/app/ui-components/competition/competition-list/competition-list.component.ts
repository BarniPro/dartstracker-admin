import { Component, OnInit } from '@angular/core';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitionModel} from '../../../models/competition.model';
import Competition = CompetitionModel.Competition;
import {countryList} from '../../../services/country';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.competitionService.get().subscribe((competitions) => {
      this.competitions = competitions;
    });
  }

  getCountryIconClass(name: string): any {
    const country = countryList.find(c => c.name === name);
    if (country) {
      const ret = 'flag-icon-' + country.code.toLocaleLowerCase();
      return ret;
    }
  }

}
