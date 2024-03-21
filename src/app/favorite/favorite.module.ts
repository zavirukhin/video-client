import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritePageComponent,
  },
];

@NgModule({
  declarations: [
    FavoritePageComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    YoutubeModule,
    RouterModule.forChild(routes),
  ],
})
export class FavoriteModule {}
