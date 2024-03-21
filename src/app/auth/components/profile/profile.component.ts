import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    public loginService: LoginService,
    private router: Router,
  ) {}

  navigateToAdmin() {
    this.router.navigate(['account', 'admin']);
  }

  navigateToFavorite() {
    this.router.navigate(['favorite']);
  }
}
