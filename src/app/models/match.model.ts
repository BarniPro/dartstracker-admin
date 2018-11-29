import {UserModel} from './user.model';
import {RoundModel} from './round.model';

export namespace MatchModel {

  import Round = RoundModel.Round;

  export interface Match {
    id: number;
    competition_id: number;
    match_date: Date;
    player_one: UserModel.User;
    player_two: UserModel.User;
    player_one_score: number;
    player_two_score: number;
    rounds: Round[];
  }

  export interface QueryRequest {
    competition_id: number;
  }

  export interface GetRequest {
    id: number;
    competition_id: number;
  }

  export interface CreateRequest {
    competition_id: number;
    match_date: string;
    player_one: UserModel.User;
    player_two: UserModel.User;
    player_one_score: number;
    player_two_score: number;
  }

  export interface UpdateRequest extends CreateRequest {
    id: number;
  }

  export interface DeleteRequest {
    id: number;
    competition_id: number;
  }

}
