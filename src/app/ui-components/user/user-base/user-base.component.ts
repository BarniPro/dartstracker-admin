import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Role} from '../../../models/user.model';
import {map, startWith} from 'rxjs/operators';
import {countryList} from '../../../services/country';
import * as moment from 'moment';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  myControl = new FormControl();
  @Input() title: string;
  @Input() edit: boolean;

  countryNames: string[] = [];
  filteredCountries: Observable<string[]>;

  roles: Role[] = ['ROLE_ADMIN', 'ROLE_PLAYER', 'ROLE_OFFICIAL'];
  role: Role;

  id: number;
  username: string;
  password: string;
  human_name: string;
  country: string;
  date_of_birth: Date;

  ngOnInit() {
    this.role = this.roles[0];
    if (this.edit) {
      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadUser(this.id);
    }
      this.loadFilteredCountries();
      this.loadCountryNames();
    }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  loadUser(userId: number) {
    this.userService.getOne({
      id: userId
    }).subscribe((user) => {
      this.password = user.password;
      this.username = user.username;
      this.human_name = user.human_name;
      this.country = user.country;
      this.date_of_birth = new Date(user.date_of_birth);
      this.role = user.role;
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

  saveUser() {
    if (this.edit) {
      this.userService.update({
        id: this.id,
        password: this.password,
        username: this.username,
        human_name: this.human_name,
        country: this.country,
        role: this.role,
        date_of_birth: moment(this.date_of_birth).format('YYYY-MM-DD'),
      }).subscribe(() => {
        this.navigate('/users');
      });
    } else {
      this.userService.create({
        password: this.password,
        username: this.username,
        human_name: this.human_name,
        country: this.country,
        role: this.role,
        date_of_birth: moment(this.date_of_birth).format('YYYY-MM-DD'),
      }).subscribe(() => {
        this.navigate('/users');
      });
    }
  }

}
