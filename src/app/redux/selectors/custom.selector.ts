import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomState } from '../state.models';

export const selectCustomFavorite = createFeatureSelector<CustomState>('custom');

export const selectCustom = createSelector(
  selectCustomFavorite,
  (state: CustomState) => state.videos,
);
