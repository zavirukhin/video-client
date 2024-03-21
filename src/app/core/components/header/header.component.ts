import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { LoginService } from 'src/app/auth/service/login.service';
import { SearchComponent } from '../search/search.component';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    ButtonComponent,
    SearchComponent,
  ],
  standalone: true,
})
export class HeaderComponent {
  constructor(
    public coreService: HeaderService,
    public loginService: LoginService,
  ) {}
}
