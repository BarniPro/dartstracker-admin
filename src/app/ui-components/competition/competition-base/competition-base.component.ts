import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {countryList} from '../../../services/country';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../../../models/user.model';
import User = UserModel.User;
import {UserService} from '../../../services/user.service';
import {CompetitionService} from '../../../services/competition.service';
import * as moment from 'moment';
import {forkJoin} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-competition-base',
  templateUrl: './competition-base.component.html',
  styleUrls: ['./competition-base.component.css']
})
export class CompetitionBaseComponent implements OnInit {

  @Input() title: string;
  @Input() edit: boolean;

  form: FormGroup;
  submitted = false;

  officials: Official[] = [];

  countryNames: string[] = [];
  filteredCountries: Observable<string[]>;

  id: number;
  cName: string;
  cCountry: string;
  cStartDate: Date;
  cEndDate: Date;
  cOfficials: User[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private competitionService: CompetitionService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      cName: ['', Validators.required],
      cCountry: ['', Validators.required],
      cStartDate: ['', Validators.required],
      cEndDate: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    if (this.edit) {
      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadCompetition(this.id);
    } else {
      this.loadOfficials();
    }
    this.loadFilteredCountries();
    this.loadCountryNames();
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  loadOfficials(officials?: User[]) {
    this.userService.get().subscribe((users) => {
      users.forEach((user) => {
        if (user.role === 'ROLE_OFFICIAL') {
          this.officials.push({
            official: user,
            selected: false
          });
        }
      });
      if (officials) {
        this.officials.forEach((official) => {
          officials.forEach((selecetdOfficial) => {
            if (official.official.id === selecetdOfficial.id) {
              official.selected = true;
            }
          });
        });
      }
    });
  }

  loadCompetition(competitionId: number) {
    this.competitionService.getOne({
      id: competitionId
    }).subscribe((competition) => {
      this.cName = competition.name;
      this.cCountry = competition.country;
      this.cStartDate = new Date(competition.start_date);
      this.cEndDate = new Date(competition.end_date);
      this.officials = [];
      this.loadOfficials(competition.officials);
    });
  }

  loadFilteredCountries() {
    this.filteredCountries = this.form.get('cCountry').valueChanges
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
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (!this.officials.find(official => official.selected === true)) {
      this.snackBar.open('Select at least one official to proceed!', 'OK', {
        duration: 2000,
      });
      return;
    }
    this.officials.forEach((official) => {
      if (official.selected) {
        this.cOfficials.push(official.official);
      }
    });
    if (this.edit) {
      this.competitionService.update({
        id: this.id,
        name: this.cName,
        country: this.cCountry,
        start_date: moment(this.cStartDate).format('YYYY-MM-DD'),
        end_date: moment(this.cEndDate).format('YYYY-MM-DD')
      }).subscribe((competition) => {
        this.setOfficials(competition.id);
      });
    } else {
      this.competitionService.create({
        name: this.cName,
        country: this.cCountry,
        start_date: moment(this.cStartDate).format('YYYY-MM-DD'),
        end_date: moment(this.cEndDate).format('YYYY-MM-DD')
      }).subscribe((competition) => {
        this.setOfficials(competition.id);
      });
    }
  }

  setOfficials(competition_id: number) {
    this.competitionService.removeOfficials({
      competition_id: competition_id
    }).subscribe(() => {
      const observables = [];
      this.officials.forEach((official) => {
        if (official.selected) {
          observables.push(this.competitionService.addOfficial({
              competition_id: competition_id,
            }, official.official
          ));
        }
      });
      forkJoin(observables).subscribe(() => {
        this.navigate('/competitions');
      });
    });
  }
}

interface Official {
  official: User;
  selected: boolean;
}
