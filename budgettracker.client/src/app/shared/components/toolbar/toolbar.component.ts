import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  menu = [
    {
      'label': 'Home',
      'link': '/home',
    },
    {
      'label': 'Accounts',
      'link': '/accounts',
    },
    {
      'label': 'Categories',
      'link': '/categories',
    }
  ];

}
