import { createAction } from '@ngrx/store';
import { Search } from '../state.models';

export const getSearch = createAction(
  '[Video] Get Search',
  (request: string, token?: string) => ({ request, token }),
);

export const getVideo = createAction(
  '[Video] Get Video',
  (ids: Array<string>) => ({ ids }),
);

export const getSearchSuccess = createAction(
  '[Video] Get Search Success',
  (search: Search) => ({ ...search }),
);

export const getSearchError = createAction('[Video] Get Search Error');
