import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { GraphService } from '../../services/graph/graph.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSupervisor = false;
  profile: any;
  constructor(
    public authService: AuthService,
    public graphService: GraphService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.graphService.getMe().subscribe(user => {
      this.profile = user;
      if (user.jobTitle !== 'Student') {
        this.isSupervisor = true;
      }
      if (user.mail === 'i7467177@bournemouth.ac.uk') {
        // Special case to bypass supervisor role
        this.isSupervisor = true;
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
