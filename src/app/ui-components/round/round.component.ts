import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoundModel} from '../../models/round.model';
import Round = RoundModel.Round;
import {RoundService} from '../../services/round.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  edit = false;
  @Input() player_one_name;
  @Input() player_two_name;
  @Input() round: Round;
  @Input() round_number;
  @Input() competition_id;
  @Input() match_id;
  @Output() round_updated: EventEmitter<any> = new EventEmitter();

  constructor(private roundService: RoundService) { }

  ngOnInit() {
  }

  winner(): string {
    const player_one_sum = this.round.player_one_throw_one + this.round.player_one_throw_two + this.round.player_one_throw_three;
    const player_two_sum = this.round.player_two_throw_one + this.round.player_two_throw_two + this.round.player_two_throw_three;
    return player_one_sum > player_two_sum ? 'player_one' : 'player_two';
  }

  setEdit() {
    this.edit = true;
  }

  normalize() {
    if (!(this.round.player_one_throw_one >= 0 && this.round.player_one_throw_one <= 180)) {
      this.round.player_one_throw_one = 0;
    }
    if (!(this.round.player_one_throw_two >= 0 && this.round.player_one_throw_two <= 180)) {
      this.round.player_one_throw_two = 0;
    }
    if (!(this.round.player_one_throw_three >= 0 && this.round.player_one_throw_three <= 180)) {
      this.round.player_one_throw_three = 0;
    }
    if (!(this.round.player_two_throw_one >= 0 && this.round.player_two_throw_one <= 180)) {
      this.round.player_two_throw_one = 0;
    }
    if (!(this.round.player_two_throw_two >= 0 && this.round.player_two_throw_two <= 180)) {
      this.round.player_two_throw_two = 0;
    }
    if (!(this.round.player_two_throw_three >= 0 && this.round.player_two_throw_three <= 180)) {
      this.round.player_two_throw_three = 0;
    }
  }

  saveRound() {
    this.normalize();
    this.roundService.update({
      competition_id: this.competition_id,
      match_id: this.match_id,
      id: this.round.id,
      player_one_throw_one: this.round.player_one_throw_one,
      player_one_throw_two: this.round.player_one_throw_two,
      player_one_throw_three: this.round.player_one_throw_three,
      player_two_throw_one: this.round.player_two_throw_one,
      player_two_throw_two: this.round.player_two_throw_two,
      player_two_throw_three: this.round.player_two_throw_three,
    }).subscribe(() => {
      this.edit = false;
      this.round_updated.emit();
    });
  }

  deleteRound() {
    this.roundService.delete({
      competition_id: this.competition_id,
      match_id: this.match_id,
      id: this.round.id
    }).subscribe(() => {
      this.round_updated.emit();
    });
  }

}
