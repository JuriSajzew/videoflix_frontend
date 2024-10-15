import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Video } from '../../startscreen/startscreen.component';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private isBrowser: boolean;
  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public async LoadAllVideos() {
    let token = null;
    if (this.isBrowser) {
      token = localStorage.getItem('token');
    }
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Token ' + token);
    }


    const url = environment.baseUrl + '/api/videos';
    return lastValueFrom(this.http.get<Video[]>(url, { headers }));

  }
}
