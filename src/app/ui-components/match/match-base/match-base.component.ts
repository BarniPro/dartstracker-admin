import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../models/user.model';
import User = UserModel.User;
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoundModel} from '../../../models/round.model';
import Round = RoundModel.Round;
import {MatchService} from '../../../services/match.service';
import {RoundService} from '../../../services/round.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-match-base',
  templateUrl: './match-base.component.html',
  styleUrls: ['./match-base.component.css']
})
export class MatchBaseComponent implements OnInit {

  player_one: User;
  player_two: User;
  player_one_score = 0;
  player_two_score = 0;

  @Input() title: string;
  @Input() edit: boolean;

  players: User[] = [];
  rounds: Round[] = [];

  competition_id: number;
  id: number;

  form: FormGroup;
  submitted = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private matchService: MatchService,
              private roundService: RoundService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar,
              private authService: AuthService) {
    this.form = this.fb.group({
    player_one: ['', Validators.required],
    player_two: ['', Validators.required],
  });
}

  hasRight(rightName: string) {
    return this.authService.hasRight(rightName);
  }

get f() { return this.form.controls; }

  ngOnInit() {
    this.competition_id = +this.activatedRoute.snapshot.paramMap.get('competition_id');
    this.loadPlayers();
    if (this.edit) {
      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadMatch();
      this.loadRounds();
    }
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  loadPlayers() {
    this.userService.get().subscribe((users) => {
      users.forEach((user) => {
        if (user.role === 'ROLE_PLAYER') {
          this.players.push(user);
        }
      });
    });
  }

  loadMatch() {
    this.matchService.getOne({
      competition_id: this.competition_id,
      id: this.id
    }).subscribe((match) => {
      this.player_one = match.player_one;
      this.player_two = match.player_two;
      this.player_one_score = match.player_one_score;
      this.player_two_score = match.player_two_score;
      this.rounds = match.rounds;
    });
  }

  saveMatch() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.rounds.length === 0) {
      this.snackBar.open('Add at least one round to the match to save!', 'OK', {
        duration: 2000,
      });
      return;
    }
    this.matchService.update({
      competition_id: this.competition_id,
      id: this.id,
      player_one: this.player_one,
      player_two: this.player_two,
      player_one_score: this.player_one_score,
      player_two_score: this.player_two_score
    }).subscribe(() => {
      this.navigate('/competitions/' + this.competition_id.toString() + '/matches');
    });
  }

  loadRounds() {
    this.rounds = [];
    this.roundService.get({
      competition_id: this.competition_id,
      match_id: this.id
    }).subscribe((rounds) => {
      this.rounds = rounds;
      this.sumScore();
    });
  }

  addRound() {
    this.roundService.create({
      competition_id: this.competition_id,
      match_id: this.id,
      player_one_throw_one: 0,
      player_one_throw_two: 0,
      player_one_throw_three: 0,
      player_two_throw_one: 0,
      player_two_throw_two: 0,
      player_two_throw_three: 0,
    }).subscribe(() => {
      this.loadRounds();
    });
  }

  compareUser(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  sumScore() {
    this.player_one_score = 0;
    this.player_two_score = 0;
    this.rounds.forEach((round) => {
      const player_one_total = (round.player_one_throw_one + round.player_one_throw_two + round.player_one_throw_three);
      const player_two_total = (round.player_two_throw_one + round.player_two_throw_two + round.player_two_throw_three);
      player_one_total > player_two_total ? this.player_one_score += 1 : this.player_two_score += 1;
    });
  }

}
