import { addCustom } from '../actions/custom.action';
import { customReducer } from './custom.reducer';

const testData = {
  id: {
    id: 'sdf',
    description: 'dsfg',
    publishedAt: '12342',
    tags: [],
    title: 'sd',
    thumbnail: 'dfh',
  },
};

describe('Custom reducer', () => {
  it('shoud addCustom set videos', () => {
    const state = customReducer({ videos: {} }, addCustom(testData));
    expect(state.videos).toStrictEqual(testData);
  });
});
