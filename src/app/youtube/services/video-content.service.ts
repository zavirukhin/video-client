import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { SortDirection, SortBy } from 'src/app/core/models/sort.model';
import {
  Video,
  VideoWrapped,
  VideoResponse,
  VideoItemResponse,
} from '../models/video.model';
import { Search, SearchResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class VideoContentService {
  constructor(
    private http: HttpClient,
  ) {}

  sortBy: SortBy = {
    date: SortDirection.none,
    viewers: SortDirection.none,
    keyword: '',
  };

  searchItem(search: string, token = '', count = 20): Observable<Search> {
    const params = new HttpParams()
      .set('type', 'video')
      .set('maxResults', count.toString())
      .set('pageToken', token)
      .set('q', search);

    return this.http.get<SearchResponse>('search', { params }).pipe(
      switchMap((response) => this.getItemByIds(
        response.items.map((item) => item.id.videoId),
      ).pipe(
        map((videos) => ({
          videos,
          nextPageToken: response.nextPageToken,
          prevPageToken: response.prevPageToken,
        })),
      )),
    );
  }

  transformData(video: VideoItemResponse): Video {
    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      tags: video.snippet.tags,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      dislikeCount: video.statistics.dislikeCount,
      commentCount: video.statistics.commentCount,
      thumbnail: video.snippet?.thumbnails.maxres?.url || video.snippet?.thumbnails?.high.url,
    };
  }

  getItemByIds(ids: string[]): Observable<VideoWrapped> {
    const params = new HttpParams()
      .set('part', 'snippet,statistics')
      .set('id', ids.join(','));

    return this.http
      .get<VideoResponse>('videos', { params })
      .pipe(
        map((response: VideoResponse) => {
          const result: VideoWrapped = {};
          response.items.forEach((item) => {
            const transformed = this.transformData(item);
            result[transformed.id] = transformed;
          });
          return result;
        }),
      );
  }

  sortChangeDate() {
    if (this.sortBy.date !== SortDirection.asc) {
      this.sortBy.date += 1;
      this.sortBy.viewers = SortDirection.none;
    } else this.sortBy.date = SortDirection.none;
  }

  sortChangeViewers() {
    if (this.sortBy.viewers !== SortDirection.asc) {
      this.sortBy.viewers += 1;
      this.sortBy.date = SortDirection.none;
    } else this.sortBy.viewers = SortDirection.none;
  }

  sortChangeKeywords(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    this.sortBy.keyword = element.value;
  }
}
