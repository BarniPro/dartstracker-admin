export namespace UserModel {

  export interface User {
    id: number;
    username: string;
    password: string;
    humanName: string;
    country: string;
    dateOfBirth: Date;
    role: Role;
  }

}

export type Role = 'ROLE_ADMIN' | 'ROLE_OFFICIAL' | 'ROLE_PLAYER';
