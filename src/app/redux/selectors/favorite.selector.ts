import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from '../state.models';

export const selectFeatureFavorite = createFeatureSelector<FavoriteState>('favorite');

export const selectFavorite = createSelector(
  selectFeatureFavorite,
  (state: FavoriteState) => state.videos,
);

export const selectCountFavorite = createSelector(
  selectFeatureFavorite,
  (state: FavoriteState) => Object.keys(state.videos).length,
);
