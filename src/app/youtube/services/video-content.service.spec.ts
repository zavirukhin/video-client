import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VideoContentService } from './video-content.service';
import searchData from './search-test-data.json';
import videosData from './videos-test-data.json';
import { VideoItemResponse, VideoWrapped } from '../models/video.model';

describe('Video Content service', () => {
  let httpController: HttpTestingController;
  let service: VideoContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VideoContentService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('shoud call sortChangeDate change sortBy', () => {
    expect(Object.values(service.sortBy)).toStrictEqual([0, 0, '']);
    service.sortChangeDate();
    expect(Object.values(service.sortBy)).toStrictEqual([1, 0, '']);
    service.sortChangeDate();
    expect(Object.values(service.sortBy)).toStrictEqual([2, 0, '']);
    service.sortChangeDate();
    expect(Object.values(service.sortBy)).toStrictEqual([0, 0, '']);
  });

  it('shoud call sortChangeViewers change sortBy', () => {
    expect(Object.values(service.sortBy)).toStrictEqual([0, 0, '']);
    service.sortChangeViewers();
    expect(Object.values(service.sortBy)).toStrictEqual([0, 1, '']);
    service.sortChangeViewers();
    expect(Object.values(service.sortBy)).toStrictEqual([0, 2, '']);
    service.sortChangeViewers();
    expect(Object.values(service.sortBy)).toStrictEqual([0, 0, '']);
  });

  it('shoud change sortDate when another sort type not default', () => {
    service.sortChangeDate();
    expect(Object.values(service.sortBy)).toStrictEqual([1, 0, '']);
    service.sortChangeViewers();
    expect(Object.values(service.sortBy)).toStrictEqual([0, 1, '']);
  });

  it('shoud change sortView when another sort type not default', () => {
    service.sortChangeViewers();
    expect(Object.values(service.sortBy)).toStrictEqual([0, 1, '']);
    service.sortChangeDate();
    expect(Object.values(service.sortBy)).toStrictEqual([1, 0, '']);
  });

  it('shoud call searchItem return data from api', (done) => {
    service.searchItem('Angular').subscribe((response) => {
      const items = videosData.items as VideoItemResponse[];
      const result: VideoWrapped = {};
      items.forEach((item) => {
        const transformed = service.transformData(item);
        result[transformed.id] = transformed;
      });
      expect(response.videos).toStrictEqual(result);
      done();
    });

    const searchReq = httpController.expectOne((r) => r.url === 'search');
    searchReq.flush(searchData);
    const videosReq = httpController.expectOne((r) => r.url === 'videos');
    videosReq.flush(videosData);
  });
});
