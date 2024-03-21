import {
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Subject,
  BehaviorSubject,
  takeUntil,
  combineLatest,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFavorite } from 'src/app/redux/selectors/favorite.selector';
import { getSearch, getVideo } from 'src/app/redux/actions/video.action';
import { selectVideoLoading, selectVideos } from 'src/app/redux/selectors/video.selector';
import { FavoriteService } from 'src/app/favorite/services/favorite.service';
import { VideoContentService } from '../../services/video-content.service';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-video-content',
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.scss'],
})
export class VideoContentComponent implements OnInit, OnDestroy {
  constructor(
    public videoContentService: VideoContentService,
    private injector: Injector,
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) {}

  @Input() type: 'favorite' | 'search' = 'search';

  currentPage$ = new BehaviorSubject<number>(0);

  destroy$ = new Subject();

  videos: Video[];

  loading$ = this.store.select(selectVideoLoading);

  ngOnInit() {
    this.injector.get(FavoriteService);
    if (this.type === 'search') {
      this.activatedRoute.params.pipe(
        takeUntil(this.destroy$),
      ).subscribe((params) => {
        this.store.dispatch(getSearch(params['request']));
      });
    } else {
      const favorites$ = this.store.select(selectFavorite);
      combineLatest([favorites$, this.currentPage$]).pipe(
        takeUntil(this.destroy$),
      ).subscribe(([ids, currentPage]) => {
        const idSlice = ids.slice(20 * currentPage, 20 * (currentPage + 1));
        this.store.dispatch(getVideo(idSlice));
      });
    }

    const videos$ = this.store.select(selectVideos);
    videos$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((videos) => {
      this.videos = Object.values(videos);
    });
  }

  setCurrentPage(page: number) {
    this.currentPage$.next(page);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
