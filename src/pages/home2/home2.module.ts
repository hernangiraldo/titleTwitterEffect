import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home2Page } from './home2';

import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [
    Home2Page,
  ],
  imports: [
    IonicPageModule.forChild(Home2Page),
    DirectivesModule
  ],
})
export class Home2PageModule {}
