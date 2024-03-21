import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss'],
})
export class HeaderDropdownComponent {
  constructor(public coreService: HeaderService) {}
}
