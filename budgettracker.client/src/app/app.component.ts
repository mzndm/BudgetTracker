import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="page">
      <app-toolbar />
      <router-outlet />
    </div>`
})
export class AppComponent {
}
