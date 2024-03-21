import { TestBed } from '@angular/core/testing';
import { HeaderService } from './header.service';

describe('Header service', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderService);
  });

  it('shoud change toggle', () => {
    expect(service.showSetting).toBeFalsy();
    service.toggleSetting();
    expect(service.showSetting).toBeTruthy();
  });
});
