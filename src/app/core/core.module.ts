import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownSettingsComponent } from './components/dropdown-settings/dropdown-settings.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { IndexComponent } from './pages/index/index.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderDropdownComponent } from './components/header-dropdown/header-dropdown.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    DropdownSettingsComponent,
    IndexComponent,
    HeaderDropdownComponent,
    NotFoundComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderComponent,
    SearchComponent,
  ],
  exports: [
    IndexComponent,
    HeaderDropdownComponent,
    NotFoundPageComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
