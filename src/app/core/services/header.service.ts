import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public showSetting = false;

  public toggleSetting() {
    this.showSetting = !this.showSetting;
  }
}
