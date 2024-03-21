import { VideoWrapped } from './video.model';

export interface SearchResponse {
  etag: string;
  items: Array<SerachItemReponse>;
  kind: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  regionCode: string;
}

export interface Search {
  videos: VideoWrapped;
  nextPageToken?: string;
  prevPageToken?: string;
}

interface SerachItemReponse {
  etag: string;
  id: {
    king: string;
    videoId: string;
  };
}
