import { selectCountFavorite, selectFavorite } from './favorite.selector';

describe('Favorite selector', () => {
  it('shoud select favorite', () => {
    const state = { videos: ['1', '2', '3'] };
    expect(selectFavorite.projector(state)).toStrictEqual(['1', '2', '3']);
  });

  it('shoud select favorite count', () => {
    const state = { videos: ['1', '2', '3'] };
    expect(selectCountFavorite.projector(state)).toEqual(3);
  });
});
