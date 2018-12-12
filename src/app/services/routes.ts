import {Routes} from '@angular/router';
import {CompetitionListComponent} from '../ui-components/competition/competition-list/competition-list.component';
import {CompetitionCreateComponent} from '../ui-components/competition/competition-create/competition-create.component';
import {CompetitionEditComponent} from '../ui-components/competition/competition-edit/competition-edit.component';
import {UserCreateComponent} from '../ui-components/user/user-create/user-create.component';
import {UserListComponent} from '../ui-components/user/user-list/user-list.component';
import {UserEditComponent} from '../ui-components/user/user-edit/user-edit.component';
import {MatchListComponent} from '../ui-components/match/match-list/match-list.component';
import {MatchCreateComponent} from '../ui-components/match/match-create/match-create.component';
import {MatchEditComponent} from '../ui-components/match/match-edit/match-edit.component';
import {LoginComponent} from '../ui-components/login/login.component';

export const appRoutes: Routes = [
  { path: 'competitions', component: CompetitionListComponent },
  { path: 'competitions/create', component: CompetitionCreateComponent },
  { path: 'competitions/:id/edit', component: CompetitionEditComponent },
  { path: 'competitions/:competition_id/matches', component: MatchListComponent },
  { path: 'competitions/:competition_id/matches/create', component: MatchCreateComponent },
  { path: 'competitions/:competition_id/matches/:id/edit', component: MatchEditComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/:id/edit', component: UserEditComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/competitions',
    pathMatch: 'full'
  },
  { path: '**', component: CompetitionListComponent }
];
