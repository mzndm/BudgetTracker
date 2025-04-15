import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
]

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButton,
    MatIcon,
    MatIconButton,
    MatTabGroup,
    MatTab
  ]
})
export class CategoriesModule { }
