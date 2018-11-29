export namespace RoundModel {

  export interface Round {
    id: number;
    competition_id: number;
    match_id: number;
    player_one_throw_one: number;
    player_one_throw_two: number;
    player_one_throw_three: number;
    player_two_throw_one: number;
    player_two_throw_two: number;
    player_two_throw_three: number;
  }

  export interface QueryRequest {
    competition_id: number;
    match_id: number;
  }

  export interface GetRequest {
    id: number;
    competition_id: number;
    match_id: number;
  }

  export interface CreateRequest {
    competition_id: number;
    match_id: number;
    player_one_throw_one: number;
    player_one_throw_two: number;
    player_one_throw_three: number;
    player_two_throw_one: number;
    player_two_throw_two: number;
    player_two_throw_three: number;
  }

  export interface UpdateRequest extends CreateRequest {
    id: number;
  }

  export interface DeleteRequest {
    id: number;
    competition_id: number;
    match_id: number;
  }

}
