import { createAction } from '@ngrx/store';
import { VideoWrapped } from 'src/app/youtube/models/video.model';

export const addCustom = createAction(
  '[Custom] Add Custom',
  (video: VideoWrapped) => ({ video }),
);
