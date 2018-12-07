import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserModel} from '../../../models/user.model';
import User = UserModel.User;
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoundModel} from '../../../models/round.model';
import Round = RoundModel.Round;
import {MatchService} from '../../../services/match.service';

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

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private matchService: MatchService) {
  }

  myControl = new FormControl();
  @Input() title: string;
  @Input() edit: boolean;

  players: User[] = [];
  rounds: Round[] = [];

  competition_id: number;
  id: number;

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
    });
  }

  loadRounds() {

  }

  compareUser(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
