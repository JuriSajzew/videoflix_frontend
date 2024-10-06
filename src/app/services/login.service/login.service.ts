import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private as: AuthService,
    private router: Router,
  ) { }

  async login(email: string, password: string) {
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(email, password);
      console.log('Hier die Anmeldung ', resp);

      localStorage.setItem('token', resp['token'])

      this.router.navigate(['/loadwindow']);

      setTimeout(() => {
        this.router.navigate(['/videocontent']);
      }, 8000);

    } catch (e) {
      //Show error message
      // Erweiterte Fehlerbehandlung
      if (e instanceof HttpErrorResponse) {
        if (e.status === 0) {
          console.error('Anfrage fehlgeschlagen; möglicherweise CORS- oder Netzwerkproblem:', e);
          alert('Netzwerk- oder Serverfehler. Bitte überprüfen Sie Ihre Verbindung.');
        } else if (e.status === 401) {
          console.error('Unauthorized:', e);
          alert('Login fehlgeschlagen. Überprüfen Sie Ihre Anmeldedaten.');
        } else {
          console.error('Backend-Fehler:', e);
          alert('Serverfehler. Bitte versuchen Sie es später erneut.');
        }
      } else {
        console.error('Unbekannter Fehler:', e);
        alert('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      }
      //alert('Login ist Fehlgeschlagen');
      //console.error('Login Error: ', e);
    }
  }
}
