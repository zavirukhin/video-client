import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';

describe('Admin component', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shoud create the admin', () => {
    expect(component).toBeTruthy();
  });

  it('shoud show error if non valid form', () => {
    component.formSubmitted = true;
    fixture.whenStable().then(() => {
      const el = fixture.debugElement.query(By.css('.error-text'));
      expect(el.nativeElement.innerHTML).toBeTruthy();
    });
  });
});
