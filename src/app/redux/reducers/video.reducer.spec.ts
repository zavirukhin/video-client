import {
  getSearch,
  getSearchError,
  getSearchSuccess,
  getVideo,
} from '../actions/video.action';
import { videoReducer } from './video.reducer';

describe('Video reducer', () => {
  it('shoud getSearch set loading state', () => {
    const state = videoReducer({ videos: {}, loading: false }, getSearch('1'));
    expect(state.loading).toBeTruthy();
  });

  it('shoud getVideo set loading state', () => {
    const state = videoReducer({ videos: {}, loading: false }, getVideo(['1']));
    expect(state.loading).toBeTruthy();
  });

  it('shoud getVideo set loading state', () => {
    const state = videoReducer({ videos: {}, loading: false }, getSearchError());
    expect(state.loading).toBeFalsy();
  });

  it('shoud getSearchSuccess set videos state', () => {
    const state = videoReducer(
      { videos: {}, loading: true },
      getSearchSuccess({
        videos: {},
        nextPageToken: '',
        prevPageToken: '',
      }),
    );
    expect(state.loading).toBeFalsy();
    expect(state.nextPageToken).toBe('');
    expect(state.prevPageToken).toBe('');
  });
});
