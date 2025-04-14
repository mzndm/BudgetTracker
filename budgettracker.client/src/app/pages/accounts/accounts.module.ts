import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import {RouterModule, Routes} from "@angular/router";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
  },
]

@NgModule({
  declarations: [
    AccountsComponent,
    EditAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatAnchor,
    MatButton,
    MatIconButton,
    MatIconModule,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatSelect,
    MatOption
  ]
})
export class AccountsModule { }
