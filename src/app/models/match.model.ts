import {UserModel} from './user.model';

export namespace MatchModel {

  export interface Match {
    id: number;
    matchDate: Date;
    playerOne: UserModel.User;
    playerTwo: UserModel.User;
    playerOneScore: number;
    playerTwoScore: number;
  }

}
