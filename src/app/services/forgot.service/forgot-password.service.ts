import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
