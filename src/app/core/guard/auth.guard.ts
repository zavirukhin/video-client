import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/auth/service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private loginService: LoginService) {}

  canActivate() {
    if (this.loginService.isLogin) return true;
    this.loginService.nagivateToLogin();
    return false;
  }
}
