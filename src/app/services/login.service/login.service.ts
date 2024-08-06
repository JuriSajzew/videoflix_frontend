import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
import { Router } from '@angular/router';

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
      console.log(resp);

      if (resp && resp.token) {
        localStorage.setItem('token', resp['token']);
        this.router.navigate(['/videocontent']);
      } else {
        alert('Login ist Fehlgeschlagen');
      }

    } catch (e) {
      //Show error message
      alert('Login ist Fehlgeschlagen');
      console.error('Login Error: ', e);
    }
  }
}
