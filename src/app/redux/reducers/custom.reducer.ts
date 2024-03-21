import { createReducer, on } from '@ngrx/store';
import { addCustom } from '../actions/custom.action';
import { CustomState } from '../state.models';

export const initialState = {
  videos: {},
};

export const customReducer = createReducer<CustomState>(
  initialState,
  on(addCustom, (state, { video }): CustomState => {
    if (Object.keys(state.videos).length < 20) {
      return {
        videos: {
          ...state.videos,
          ...video,
        },
      };
    }
    return {
      videos: {
        ...state.videos,
      },
    };
  }),
);
