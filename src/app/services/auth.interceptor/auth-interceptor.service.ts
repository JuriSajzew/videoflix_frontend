import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Überprüfe, ob das Token hier korrekt ausgegeben wird

    if (token) {
      console.log('Token found, adding to request');
      request = request.clone({
        setHeaders: { Authorization: `Token ${token}` }
      });
    } else {
      console.log('No token found');
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log('Unauthorized, redirecting to login');
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => err);
      })
    )
  }
}
