import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-root',
    template: `
    <div class="page">
      @if (this.authService.isLoggedIn()) {
        <div class="container">
          <app-toolbar />
        </div>
      }
      <router-outlet />
    </div>`,
    standalone: false
})
export class AppComponent {
  constructor(
    public authService: AuthService
  ) {}
}
