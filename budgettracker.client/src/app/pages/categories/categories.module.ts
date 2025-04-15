import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
]

@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButton,
    MatIcon,
    MatIconButton,
    MatTabGroup,
    MatTab,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatPrefix
  ]
})
export class CategoriesModule { }
