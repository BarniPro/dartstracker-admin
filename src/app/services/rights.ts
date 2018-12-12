import {Right} from './rights';

export interface Right {
  name: string;
  admin: boolean;
  official: boolean;
  player: boolean;
}

const userView: Right = {
  name: 'userView',
  admin: true,
  official: true,
  player: true
};

const userModify: Right = {
  name: 'userModify',
  admin: true,
  official: false,
  player: false
};

const competitionView: Right = {
  name: 'competitionView',
  admin: true,
  official: true,
  player: true
};

const competitionModify: Right = {
  name: 'competitionModify',
  admin: true,
  official: true,
  player: false
};

const matchView: Right = {
  name: 'matchView',
  admin: true,
  official: true,
  player: true
};

const matchModify: Right = {
  name: 'matchModify',
  admin: true,
  official: true,
  player: false
};

export const Rights: Right[] = [
  userView,
  userModify,
  competitionModify,
  competitionView,
  matchView,
  matchModify
];
