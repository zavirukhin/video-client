import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../state.models';

export const selectFeatureSearch = createFeatureSelector<SearchState>('video');

export const selectVideos = createSelector(
  selectFeatureSearch,
  (state: SearchState) => state.videos,
);

export const selectVideoLoading = createSelector(
  selectFeatureSearch,
  (state: SearchState) => state.loading,
);

export const selectTokenNext = createSelector(
  selectFeatureSearch,
  (state: SearchState) => state.nextPageToken,
);

export const selectTokenPrev = createSelector(
  selectFeatureSearch,
  (state: SearchState) => state.prevPageToken,
);
