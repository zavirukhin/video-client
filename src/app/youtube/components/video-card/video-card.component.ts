import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { addFavorite, removeFavorite } from 'src/app/redux/actions/favorite.action';
import { selectFavorite } from 'src/app/redux/selectors/favorite.selector';
import { selectCustom } from 'src/app/redux/selectors/custom.selector';
import { Video, VideoWrapped } from '../../models/video.model';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit, OnDestroy {
  @Input() video: Video;

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  favorites: Array<string>;

  custom: VideoWrapped;

  destroy$ = new Subject();

  ngOnInit() {
    const favorites$ = this.store.select(selectFavorite);
    favorites$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((favorites) => {
      this.favorites = favorites;
    });

    const custom$ = this.store.select(selectCustom);
    custom$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((custom) => {
      this.custom = custom;
    });
  }

  navigateToDetail() {
    this.router.navigate(['detail', this.video.id]);
  }

  isCustom() {
    return Object.keys(this.custom).includes(this.video.id);
  }

  isFavorite() {
    return this.favorites.includes(this.video.id);
  }

  addFavorite() {
    this.store.dispatch(addFavorite(this.video.id));
  }

  removeFavorite() {
    this.store.dispatch(removeFavorite(this.video.id));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
