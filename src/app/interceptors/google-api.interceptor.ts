import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleApi implements HttpInterceptor {
  url = 'https://www.googleapis.com/youtube/v3/';

  key = 'API-KEY';

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = req.clone({
      url: this.url + req.url,
      params: req.params.set('key', this.key),
    });

    return next.handle(modifiedRequest);
  }
}
