import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {RouterLink} from "@angular/router";
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";



@NgModule({
  declarations: [
    ToolbarComponent,
    DeleteDialogComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ]
})
export class SharedModule { }
