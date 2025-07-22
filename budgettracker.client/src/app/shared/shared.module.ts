import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {RouterLink} from "@angular/router";
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import { PeriodPipe } from './pipes/period.pipe';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";



@NgModule({
  declarations: [
    ToolbarComponent,
    DeleteDialogComponent,
    PeriodPipe
  ],
  exports: [
    ToolbarComponent,
    PeriodPipe
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ]
})
export class SharedModule { }
