import { addFavorite, removeFavorite, setFavorite } from '../actions/favorite.action';
import { favoriteReducer } from './favorite.reducer';

describe('Favorite reducer', () => {
  it('shoud setFavorite set favorite', () => {
    const state = favoriteReducer({ videos: [] }, setFavorite(['1', '2', '3']));
    expect(state.videos).toStrictEqual(['1', '2', '3']);
  });

  it('shoud addFavorite set favorite', () => {
    const state = favoriteReducer({ videos: ['1', '2'] }, addFavorite('3'));
    expect(state.videos).toStrictEqual(['1', '2', '3']);
  });

  it('shoud removeFavorite remove favorite', () => {
    const state = favoriteReducer({ videos: ['1', '2', '3'] }, removeFavorite('3'));
    expect(state.videos).toStrictEqual(['1', '2']);
  });
});
