import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomPatternValidator } from '../../validators/pattern.validator';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
  ) {
    if (loginService.isLogin) {
      loginService.navigateToProfile();
    }
  }

  formSubmitted = false;

  loginForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      CustomPatternValidator('^(?=.*[a-z])(?=.*[A-Z]).+$', 'mixin_letter'),
      CustomPatternValidator('^(?=.*[a-zA-Z])(?=.*\\d).+$', 'mixin_letter_number'),
      CustomPatternValidator('[$&+,:;=?@#|\'<>.^*()%!-]', 'special_char'),
    ]),
  });

  getParamError(from: string) {
    const form = this.loginForm.get(from) as FormControl;
    return form.errors ? Object.keys(form.errors || {})[0] : null;
  }

  formHandler() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.loginService.auth(
        String(this.loginForm.value.login),
        String(this.loginForm.value.password),
      );
      this.loginService.navigateToProfile();
    }
  }
}
