import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="page">
      <div class="container">
        <app-toolbar />
      </div>
      <router-outlet />
    </div>`
})
export class AppComponent {
}
