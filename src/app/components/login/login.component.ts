import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService , private router: Router) {
    if (this.authService.isAuth) {
      this.router.navigate(['/student']);
    }
  }

  ngOnInit() {
  }

  async signIn(): Promise<void> {
    await this.authService.signIn().then(() => { this.router.navigate(['/student']); });
  }

}
