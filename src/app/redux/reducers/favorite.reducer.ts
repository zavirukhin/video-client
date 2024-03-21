import { createReducer, on } from '@ngrx/store';
import { FavoriteState } from '../state.models';
import { addFavorite, removeFavorite, setFavorite } from '../actions/favorite.action';

export const initialState = {
  videos: [],
};

export const favoriteReducer = createReducer<FavoriteState>(
  initialState,
  on(setFavorite, (state, { videos }): FavoriteState => ({
    ...state,
    videos,
  })),
  on(addFavorite, (state, { id }): FavoriteState => ({
    ...state,
    videos: [
      ...state.videos,
      id,
    ],
  })),
  on(removeFavorite, (state, { id }): FavoriteState => ({
    ...state,
    videos: [
      ...state.videos,
    ].filter((storedId) => storedId !== id),
  })),
);
