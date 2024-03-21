import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { getSearch } from 'src/app/redux/actions/video.action';
import { selectCountFavorite } from 'src/app/redux/selectors/favorite.selector';
import { selectTokenNext, selectTokenPrev } from 'src/app/redux/selectors/video.selector';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {}

  @Input() type: 'search' | 'favorite' = 'search';

  @Output() currentPageEvent = new EventEmitter<number>();

  destroy$ = new Subject();

  favoriteCount: number;

  currentPage = 0;

  nextPageToken: string | undefined;

  prevPageToken: string | undefined;

  request: string;

  switchPage(token?: string) {
    if (this.type === 'search') {
      this.store.dispatch(getSearch(this.request, token));
    }
  }

  ngOnInit() {
    const nextPageToken$ = this.store.select(selectTokenNext);
    nextPageToken$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((token) => {
      this.nextPageToken = token;
    });

    const prevPageToken$ = this.store.select(selectTokenPrev);
    prevPageToken$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((token) => {
      this.prevPageToken = token;
    });

    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params) => {
      this.request = params['request'];
    });

    const favoriteCount$ = this.store.select(selectCountFavorite);
    favoriteCount$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((favoriteCount) => {
      this.favoriteCount = favoriteCount;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  nextPage() {
    this.currentPage += 1;
    this.currentPageEvent.emit(this.currentPage);
  }

  prevPage() {
    this.currentPage -= 1;
    this.currentPageEvent.emit(this.currentPage);
  }

  maxPage() {
    return Math.floor(this.favoriteCount / 20);
  }
}
