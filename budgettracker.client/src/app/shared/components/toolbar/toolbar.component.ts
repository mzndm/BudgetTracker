import { Component } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.css',
    standalone: false
})
export class ToolbarComponent {
  menu = [
    {
      'label': 'Accounts',
      'link': '/accounts',
    },
    {
      'label': 'Categories',
      'link': '/categories',
    },
    {
      'label': 'Statistics',
      'link': '/statistics',
    }
  ];

  user$ = this.dataService.getUserProfile();

  constructor(
    private dataService: DataService,
    private autService: AuthService
  ) {}


  logout(): void {
      this.autService.logout();
  }
}
