export namespace CompetitionModel {

  export interface Competition {
    id: number;
    name: string;
    country: string;
    start_date: string;
    end_date: string;
  }

  export interface GetRequest {
    id: number;
  }

  export interface CreateRequest {
    name: string;
    country: string;
    start_date: String;
    end_date: String;
  }

  export interface UpdateRequest extends CreateRequest {
    id: number;
  }

  export interface DeleteRequest {
    id: number;
  }

  export interface QueryOfficialsRequest {
    competition_id: number;
  }

  export interface RemoveOfficialsRequest {
    competition_id: number;
  }

  export interface RemoveOfficialRequest {
    id: number;
    competition_id: number;
  }

  export interface AddOfficialRequest {
    competition_id: number;
  }

}

