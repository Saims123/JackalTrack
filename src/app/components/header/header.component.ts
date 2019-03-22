import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { GraphService } from '../../graph/graph.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSupervisor = false;
  constructor(
    public authService: AuthService,
    public graphService: GraphService,
    private router: Router
  ) {}

  ngOnInit() {}

  async signIn(): Promise<void> {
    await this.authService.signIn().then(() => {
      this.graphService.getMe().then(data => {
        if (data.jobTitle !== 'Student') {
          this.isSupervisor = true;
        }
      }).then(() => {
          if (this.authService.isAuth) {
            this.router.navigate(['/student']);
          }
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}