import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {BaseChartDirective} from "ng2-charts";

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
  },
]

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButton,
    MatIcon,
    MatIconButton,
    MatTab,
    MatTabGroup,
    BaseChartDirective,
  ]
})
export class StatisticsModule { }
