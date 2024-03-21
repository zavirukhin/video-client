import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setFavorite } from 'src/app/redux/actions/favorite.action';
import { selectFavorite } from 'src/app/redux/selectors/favorite.selector';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private store: Store) {
    this.store.dispatch(setFavorite(JSON.parse(localStorage.getItem('favorites') || '[]')));
    const favorite = this.store.select(selectFavorite);
    favorite.subscribe((favorites) => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  }
}
