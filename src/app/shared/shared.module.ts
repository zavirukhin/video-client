import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  imports: [ButtonComponent],
  exports: [ButtonComponent],
})
export class SharedModule {}
