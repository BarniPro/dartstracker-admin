import {UserModel} from './user.model';

export namespace CompetitionModel {

  import User = UserModel.User;

  export interface Competition {
    id: number;
    name: string;
    country: string;
    start_date: string;
    end_date: string;
    officials: User[];
  }

  export interface GetRequest {
    id: number;
  }

  export interface CreateRequest {
    name: string;
    country: string;
    start_date: String;
    end_date: String;
    officials: User[];
  }

  export interface UpdateRequest extends CreateRequest {
    id: number;
  }

  export interface DeleteRequest {
    id: number;
  }

}

