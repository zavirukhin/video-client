import { createReducer, on } from '@ngrx/store';
import {
  getSearch,
  getSearchSuccess,
  getSearchError,
  getVideo,
} from '../actions/video.action';
import { SearchState } from '../state.models';

export const initialState = {
  loading: false,
  videos: {},
};

export const videoReducer = createReducer<SearchState>(
  initialState,
  on(getSearch, (state): SearchState => ({
    ...state,
    loading: true,
  })),
  on(getVideo, (state): SearchState => ({
    ...state,
    loading: true,
  })),
  on(getSearchSuccess, (state, search): SearchState => ({
    ...state,
    ...search,
    loading: false,
  })),
  on(getSearchError, (state): SearchState => ({
    ...state,
    loading: false,
  })),
);
