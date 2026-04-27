import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenderSelectPageRoutingModule } from './gender-select-routing.module';

import { GenderSelectPage } from './gender-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenderSelectPageRoutingModule
  ],
  declarations: [GenderSelectPage]
})
export class GenderSelectPageModule {}
