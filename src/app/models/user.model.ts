export namespace UserModel {

  export interface User {
    id: number;
    username: string;
    password: string;
    human_name: string;
    country: string;
    date_of_birth: string;
    role: Role;
  }

  export interface GetRequest {
    id: number;
  }

  export interface CreateRequest {
    username: string;
    password: string;
    human_name: string;
    country: string;
    date_of_birth: string;
    role: Role;
  }

  export interface UpdateRequest extends CreateRequest {
    id: number;
  }

  export interface DeleteRequest {
    id: number;
  }

}

export type Role = 'ROLE_ADMIN' | 'ROLE_OFFICIAL' | 'ROLE_PLAYER';
