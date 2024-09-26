import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginWithUsernameAndPassword(email: string, password: string) {
    const url = environment.baseUrl + '/login/';
    console.log(url);
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

    if (error.error instanceof ErrorEvent) {
      // Client-seitiger Fehler
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-seitiger Fehler
      if (error.error) {
        // Überprüfe die Struktur des serverseitigen Fehlers
        if (typeof error.error === 'string') {
          errorMessage = error.error; // Wenn die Fehlermeldung ein einfacher String ist
        } else if (error.error.errors) {
          // Fehlerdetails in einem bestimmten Format
          const errorDetails = error.error.errors;
          if (typeof errorDetails === 'object') {
            // Extrahiere und kombiniere die Fehlermeldungen
            errorMessage = Object.values(errorDetails).flat().join(', ');
          } else {
            errorMessage = errorDetails;
          }
        } else if (error.error.error) {
          errorMessage = error.error.error; // Eine allgemeine Fehlermeldung
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    // Protokolliere die endgültige Fehlermeldung für Debugging-Zwecke
    console.log('Server error message:', errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
