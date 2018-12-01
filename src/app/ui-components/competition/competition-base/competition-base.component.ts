import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {countryList} from '../../../services/country';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../../../models/user.model';
import User = UserModel.User;
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-competition-base',
  templateUrl: './competition-base.component.html',
  styleUrls: ['./competition-base.component.css']
})
export class CompetitionBaseComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  myControl = new FormControl();
  @Input() title: string;
  @Input() edit: boolean;

  officials: Official[] = [];

  countryNames: string[] = [];
  filteredCountries: Observable<string[]>;

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
            id: user.id,
            name: user.human_name,
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

  }
}

interface Official {
  id: number;
  name: string;
  selected: boolean;
}
