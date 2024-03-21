export interface VideoResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItemResponse[];
}

export interface VideoItemResponse {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: VideoThumbnailResponse;
      medium: VideoThumbnailResponse;
      high: VideoThumbnailResponse;
      standard: VideoThumbnailResponse;
      maxres: VideoThumbnailResponse
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface VideoWrapped {
  [key: string]: Video;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: Array<string>;
  viewCount?: string;
  likeCount?: string;
  dislikeCount?: string;
  commentCount?: string;
  thumbnail: string;
}

interface VideoThumbnailResponse {
  url: string;
  width: number;
  height: number;
}
