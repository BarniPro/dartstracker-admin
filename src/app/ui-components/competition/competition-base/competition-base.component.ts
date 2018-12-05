import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {countryList} from '../../../services/country';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../../../models/user.model';
import User = UserModel.User;
import {UserService} from '../../../services/user.service';
import {CompetitionService} from '../../../services/competition.service';
import * as moment from 'moment';

@Component({
  selector: 'app-competition-base',
  templateUrl: './competition-base.component.html',
  styleUrls: ['./competition-base.component.css']
})
export class CompetitionBaseComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private competitionService: CompetitionService) { }

  myControl = new FormControl();
  @Input() title: string;
  @Input() edit: boolean;

  officials: Official[] = [];

  countryNames: string[] = [];
  filteredCountries: Observable<string[]>;

  cName: string;
  cCountry: string;
  cStartDate: Date;
  cEndDate: Date;
  cOfficials: User[] = [];

  ngOnInit() {
    this.loadOfficials();
    this.loadFilteredCountries();
    this.loadCountryNames();
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  loadOfficials() {
    this.userService.get().subscribe((users) => {
      users.forEach((user) => {
        if (user.role === 'ROLE_OFFICIAL') {
          this.officials.push({
            official: user,
            selected: false
          });
        }
      });
    });
  }

  loadFilteredCountries() {
    this.filteredCountries = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  loadCountryNames() {
    countryList.forEach((country) => {
      this.countryNames.push(country.name);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countryNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  saveCompetition() {
    this.officials.forEach((official) => {
      if (official.selected) {
        this.cOfficials.push(official.official);
      }
    });
    this.competitionService.create({
      name: this.cName,
      country: this.cCountry,
      start_date: moment(this.cStartDate).format('YYYY-MM-DD'),
      end_date: moment(this.cEndDate).format('YYYY-MM-DD')
    }).subscribe((competition) => {
      this.setOfficials(competition.id);
    });
  }

  setOfficials(competition_id: number) {
    this.competitionService.removeOfficials({
      competition_id: competition_id
    }).subscribe(() => {
      this.officials.forEach((official) => {
        if (official.selected) {
          this.competitionService.addOfficial({
              competition_id: competition_id,
            }, official.official
          ).subscribe(() => {

          });
        }
      });
    });
  }
}

interface Official {
  official: User;
  selected: boolean;
}
