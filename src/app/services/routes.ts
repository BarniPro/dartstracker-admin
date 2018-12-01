import {Routes} from '@angular/router';
import {CompetitionListComponent} from '../ui-components/competition/competition-list/competition-list.component';

export const appRoutes: Routes = [
  { path: 'competitions', component: CompetitionListComponent },
  { path: '',
    redirectTo: '/competitions',
    pathMatch: 'full'
  },
  { path: '**', component: CompetitionListComponent }
];
