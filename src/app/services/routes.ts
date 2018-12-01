import {Routes} from '@angular/router';
import {CompetitionListComponent} from '../ui-components/competition/competition-list/competition-list.component';
import {CompetitionCreateComponent} from '../ui-components/competition/competition-create/competition-create.component';
import {CompetitionEditComponent} from '../ui-components/competition/competition-edit/competition-edit.component';

export const appRoutes: Routes = [
  { path: 'competitions', component: CompetitionListComponent },
  { path: 'competitions/create', component: CompetitionCreateComponent },
  { path: 'competitions/:id/create', component: CompetitionEditComponent },
  { path: '',
    redirectTo: '/competitions',
    pathMatch: 'full'
  },
  { path: '**', component: CompetitionListComponent }
];
