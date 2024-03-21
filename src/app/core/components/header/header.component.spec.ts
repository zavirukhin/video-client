import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('Header Component', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shoud create the header', () => {
    expect(component).toBeTruthy();
  });

  it('shoud open dropdown', () => {
    const button = fixture
      .debugElement
      .query(By.css('.button-icon'))
      .nativeElement as HTMLElement;
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const dropdown = fixture
        .debugElement
        .query(By.css('.dropdown-container'))
        .nativeElement as HTMLElement;
      expect(dropdown).toBeTruthy();
    });
  });
});
