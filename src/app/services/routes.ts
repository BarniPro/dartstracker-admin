import {Routes} from '@angular/router';
import {CompetitionListComponent} from '../ui-components/competition/competition-list/competition-list.component';
import {CompetitionCreateComponent} from '../ui-components/competition/competition-create/competition-create.component';
import {CompetitionEditComponent} from '../ui-components/competition/competition-edit/competition-edit.component';
import {UserCreateComponent} from '../ui-components/user/user-create/user-create.component';
import {UserListComponent} from '../ui-components/user/user-list/user-list.component';
import {UserEditComponent} from '../ui-components/user/user-edit/user-edit.component';

export const appRoutes: Routes = [
  { path: 'competitions', component: CompetitionListComponent },
  { path: 'competitions/create', component: CompetitionCreateComponent },
  { path: 'competitions/:id/edit', component: CompetitionEditComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/:id/edit', component: UserEditComponent },
  { path: '',
    redirectTo: '/competitions',
    pathMatch: 'full'
  },
  { path: '**', component: CompetitionListComponent }
];
