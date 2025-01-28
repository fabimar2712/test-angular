import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorsPage } from './tutors.page';

const routes: Routes = [
  {
    path: '',
    component: TutorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorsPageRoutingModule {}
