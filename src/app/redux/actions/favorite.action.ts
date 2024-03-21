import { createAction } from '@ngrx/store';

export const setFavorite = createAction(
  '[Favorite] Set Favorite',
  (videos: Array<string>) => ({ videos }),
);

export const addFavorite = createAction(
  '[Favorite] Add Favorite',
  (id: string) => ({ id }),
);

export const removeFavorite = createAction(
  '[Favorite] Add removeFavorite',
  (id: string) => ({ id }),
);
