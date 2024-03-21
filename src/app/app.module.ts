import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { IndexComponent } from './core/pages/index/index.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { GoogleApi } from './interceptors/google-api.interceptor';
import { videoReducer } from './redux/reducers/video.reducer';
import { VideoEffects } from './redux/effects/video.effect';
import { favoriteReducer } from './redux/reducers/favorite.reducer';
import { customReducer } from './redux/reducers/custom.reducer';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then((m) => m.FavoriteModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({
      video: videoReducer,
      favorite: favoriteReducer,
      custom: customReducer,
    }),
    EffectsModule.forRoot([VideoEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GoogleApi,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [CoreModule],
})
export class AppModule { }
