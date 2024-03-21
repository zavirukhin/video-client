import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';

describe('Profile component', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shoud create the profile', () => {
    expect(component).toBeTruthy();
  });

  it('shoud containe non auth msg', () => {
    const el = fixture.debugElement.query(By.css('h2'));
    expect(el.nativeElement.innerHTML).toBe('You are not authorized');
  });
});
