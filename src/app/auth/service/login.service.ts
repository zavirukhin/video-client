import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {
    if (localStorage.getItem('login') && localStorage.getItem('token')) {
      this.isLogin = true;
      this.login = String(localStorage.getItem('login'));
    }
  }

  isLogin = false;

  login = '';

  auth(login: string, password: string) {
    if (login) {
      const token = login + password;
      localStorage.setItem('login', login);
      localStorage.setItem('token', token);
      this.login = String(login);
      this.isLogin = true;
    }
  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    this.isLogin = false;
  }

  nagivateToLogin() {
    this.router.navigate(['account', 'login']);
  }

  navigateToProfile() {
    this.router.navigate(['account']);
  }
}
