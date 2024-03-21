import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VideoContentComponent } from './components/video-content/video-content.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { UnderlineDirective } from './directives/underline.directive';
import { SharedModule } from '../shared/shared.module';
import { SortPipe } from './pipes/sort.pipe';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CoreModule } from '../core/core.module';
import { DetailCardComponent } from './components/detail-card/detail-card.component';
import { DetailCardPageComponent } from './pages/detail-card-page/detail-card-page.component';
import { PaginationComponent } from './components/pagination/pagination.component';

const routes: Routes = [
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:request', component: SearchPageComponent },
  { path: 'detail/:id', component: DetailCardPageComponent },
];

@NgModule({
  declarations: [
    VideoContentComponent,
    VideoCardComponent,
    UnderlineDirective,
    SearchPageComponent,
    SortPipe,
    DetailCardComponent,
    DetailCardPageComponent,
    PaginationComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    VideoContentComponent,
    SortPipe,
  ],
})
export class YoutubeModule {}
