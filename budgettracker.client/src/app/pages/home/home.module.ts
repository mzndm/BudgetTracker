import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  declarations: [
    HomeComponent,
    EditTransactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButton,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatSelect,
    MatOption,
    MatDialogActions
  ]
})
export class HomeModule { }
