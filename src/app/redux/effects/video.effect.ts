import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  take,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { VideoContentService } from 'src/app/youtube/services/video-content.service';
import { VideoWrapped } from 'src/app/youtube/models/video.model';
import { selectCustom } from '../selectors/custom.selector';
import {
  getSearch,
  getSearchSuccess,
  getSearchError,
  getVideo,
} from '../actions/video.action';

@Injectable()
export class VideoEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private videoContentService: VideoContentService,
  ) {}

  // eslint-disable-next-line arrow-body-style
  search$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSearch),
      switchMap(({ request, token }) => this.videoContentService.searchItem(request, token).pipe(
        switchMap((search) => {
          if (search.prevPageToken === undefined) {
            const custom$ = this.store.select(selectCustom);
            return custom$.pipe(
              map((custom) => {
                const searchSlice: VideoWrapped = {};
                Object.keys(search.videos)
                  .slice(0, Math.max(20 - Object.keys(custom).length))
                  .forEach((key) => {
                    searchSlice[key] = search.videos[key];
                  });
                return getSearchSuccess({
                  videos: {
                    ...custom,
                    ...searchSlice,
                  },
                  nextPageToken: search.nextPageToken,
                  prevPageToken: search.prevPageToken,
                });
              }),
              take(1),
            );
          }
          return of(getSearchSuccess(search));
        }),
        catchError(() => of(getSearchError())),
      )),
    );
  });

  // eslint-disable-next-line arrow-body-style
  video$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVideo),
      switchMap(({ ids }) => this.videoContentService.getItemByIds(ids).pipe(
        map((videos) => getSearchSuccess({
          videos,
          nextPageToken: '',
          prevPageToken: '',
        })),
        catchError(() => of(getSearchError())),
      )),
    );
  });
}
