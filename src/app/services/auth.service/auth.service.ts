import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router,) { }

  public loginWithUsernameAndPassword(email: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "username": email,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }

  public LogOut() {
    localStorage.removeItem('token');
  }

  register(userData: { username: string; email: string; password: string }): Observable<any> {
    const url = environment.baseUrl + '/register/'
    return this.http.post(url, userData).pipe(
      catchError(this.handleError)
    );
    
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = 'Network or server error. Please check your connection.';
      } else if (error.status === 401) {
        errorMessage = 'Register failed. Please check your details.';
      } else {
        errorMessage = 'Register failed. Please check your details.';
      }
    }
    return throwError(() => errorMessage);
  }
}
