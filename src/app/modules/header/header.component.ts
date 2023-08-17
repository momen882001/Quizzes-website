import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService : AuthService) {}
  isLogined : boolean = false

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isLogined = user ? true : false;
    })
  }

  onNavigateSignUp() {
    this.router.navigate(['/signup']);
  }

  onLogout() {
    this.authService.user.next(null)
    this.router.navigate(['/login']);
  }

  onNavigateLogin() {
    this.router.navigate(['/login']);
  }
}
