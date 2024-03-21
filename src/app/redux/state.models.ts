import { Video } from '../youtube/models/video.model';

export interface Search {
  videos: {
    [key: string]: Video;
  };
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface SearchState extends Search {
  loading: boolean;
}

export interface FavoriteState {
  videos: Array<string>;
}

export interface CustomState {
  videos: {
    [key: string]: Video;
  };
}

export interface AppState {
  search: SearchState;
  favorite: FavoriteState;
  custom: CustomState;
}
