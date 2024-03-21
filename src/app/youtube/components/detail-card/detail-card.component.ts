import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { getVideo } from 'src/app/redux/actions/video.action';
import { selectVideoLoading, selectVideos } from 'src/app/redux/selectors/video.selector';
import { selectFavorite } from 'src/app/redux/selectors/favorite.selector';
import { selectCustom } from 'src/app/redux/selectors/custom.selector';
import { addFavorite, removeFavorite } from 'src/app/redux/actions/favorite.action';
import { FavoriteService } from 'src/app/favorite/services/favorite.service';
import { VideoContentService } from '../../services/video-content.service';
import { Video, VideoWrapped } from '../../models/video.model';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
})
export class DetailCardComponent implements OnInit, OnDestroy {
  constructor(
    public videoContentService: VideoContentService,
    private activateRoute: ActivatedRoute,
    private store: Store,
    private injector: Injector,
  ) {}

  id: string;

  destroy$ = new Subject();

  videos: Video[] = [];

  favorites: Array<string>;

  custom: VideoWrapped;

  loading$ = this.store.select(selectVideoLoading);

  ngOnInit() {
    this.injector.get(FavoriteService);
    this.activateRoute.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params) => {
      this.id = params['id'];
      this.store.dispatch(getVideo([params['id']]));
    });

    const favorites$ = this.store.select(selectFavorite);
    favorites$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((favorites) => {
      this.favorites = favorites;
    });

    const custom$ = this.store.select(selectCustom);
    const videos$ = this.store.select(selectVideos);
    custom$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((custom) => {
      this.custom = custom;
    });

    combineLatest([videos$, custom$]).pipe(
      takeUntil(this.destroy$),
    ).subscribe(([videos, custom]) => {
      if (Object.values(videos).length) {
        this.videos = Object.values(videos);
      } else if (custom[this.id]) {
        this.videos = [custom[this.id]];
      }
    });
  }

  isFavorite(id: string) {
    return this.favorites.includes(id);
  }

  addFavorite(id: string) {
    this.store.dispatch(addFavorite(id));
  }

  isCustom() {
    return Object.keys(this.custom).includes(this.id);
  }

  removeFavorite(id: string) {
    this.store.dispatch(removeFavorite(id));
  }

  getDate(date: string) {
    return new Date(date).toLocaleTimeString([], {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', weekday: 'long',
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
