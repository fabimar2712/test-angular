import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorsPageRoutingModule } from './tutors-routing.module';

import { TutorsPage } from './tutors.page';

@NgModule({
  imports: [TutorsPageRoutingModule],
})
export class TutorsPageModule {}
