import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { UkmPage } from './ukm.page';
import {UkmRoutingModule} from "./ukm-routing.module";

const routes: Routes = [
  {
    path: '',
    component: UkmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UkmRoutingModule,
  ],
  declarations: [UkmPage]
})
export class UkmPageModule {}
