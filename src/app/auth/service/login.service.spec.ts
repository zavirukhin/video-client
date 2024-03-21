import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

describe('Login service', () => {
  let service: LoginService;

  beforeEach(() => {
    localStorage.setItem('login', 'test@example.com');
    localStorage.setItem('token', 'test@example.com');

    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('shoud set value from localstorage', () => {
    expect(service.isLogin).toBeTruthy();
  });

  it('shoud set login after init', () => {
    expect(service.login).toBe('test@example.com');
  });

  it('shoud remove key when call logout', () => {
    service.logout();
    expect(service.isLogin).toBeFalsy();
    expect(localStorage.getItem('login')).toBeFalsy();
    expect(localStorage.getItem('token')).toBeFalsy();
  });

  it('shoud set localstorage when call auth', () => {
    localStorage.clear();
    service.auth('test@example.com', 'test@example.com');
    expect(localStorage.getItem('login')).toBeTruthy();
    expect(localStorage.getItem('token')).toBeTruthy();
  });
});
