import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('Login component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shoud create the login', () => {
    expect(component).toBeTruthy();
  });

  it('shoud login form valid', () => {
    component.loginForm.setValue({
      login: 'test@example.com',
      password: '123456!dA3!#',
    });
    expect(component.loginForm.valid).toBeTruthy();
  });
});
