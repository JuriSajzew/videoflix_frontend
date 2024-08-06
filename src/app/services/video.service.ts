import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Video } from '../startscreen/startscreen.component';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private platformId: Object;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

  private async getAuthHeaders(): Promise<HttpHeaders> {
    // Stelle sicher, dass der Code im Browser ausgeführt wird
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      console.log('Token aus localStorage:', token); // Debugging: Ausgabe des Tokens

      // Falls kein Token vorhanden ist, gib einen leeren Header zurück
      if (!token) {
        return new HttpHeaders();
      }

      // Auth-Header mit Token erstellen
      return new HttpHeaders({
        'Authorization': `Token ${token.trim()}`
      });
    } else {
      return new HttpHeaders();
    }
  }


  public async LoadAllVideos() {
    const headers =  await this.getAuthHeaders(); // Authentifizierungs-Header abrufen

    const url = environment.baseUrl + '/api/videos';
    try {
      const response = await lastValueFrom(this.http.get<Video[]>(url, { headers }));
      return response;
    } catch (error) {
      console.error('Fehler beim Laden der Videos:', error);
      throw error;
    }
  }
}
