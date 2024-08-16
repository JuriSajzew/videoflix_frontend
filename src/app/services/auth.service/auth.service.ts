import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public loginWithUsernameAndPassword(email: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "username": email,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  } 

  public LogOut(){
    localStorage.removeItem('token');
  }

  register(userData: { username: string; email: string; password: string }): Observable<any> {
    const url = environment.baseUrl + '/register/'
    return this.http.post(url, userData);
  }
}
