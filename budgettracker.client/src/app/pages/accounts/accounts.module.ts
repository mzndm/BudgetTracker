import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import {RouterModule, Routes} from "@angular/router";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
  },
]

@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatAnchor,
    MatButton,
    MatIconButton,
    MatIconModule
  ]
})
export class AccountsModule { }
