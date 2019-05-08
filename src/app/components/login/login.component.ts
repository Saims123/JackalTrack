import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authService: AuthService, private router: Router) {
    if (this.authService.isAuth) {
      this.router.navigate(['/dashboard']);
    }
  }

  async signIn(): Promise<void> {
    await this.authService.signIn().then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
