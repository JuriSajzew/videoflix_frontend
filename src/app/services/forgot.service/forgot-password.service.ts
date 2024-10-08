import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient,) { }

  async forgotPassword(email: string) {
    const url = environment.baseUrl + '/password_reset/';
    const body = {
      "email": email
    }
    return lastValueFrom(this.http.post(url, body));
  }

  getEmails(): Observable<string[]> {
    const  base = environment.baseUrl + '/user-emails/';
    return this.http.get<string[]>(base);
  }
}
