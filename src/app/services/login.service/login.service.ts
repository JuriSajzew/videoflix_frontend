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

  async login(email: string, password: string): Promise<string | null> {
    
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(email, password);

      localStorage.setItem('token', resp['token']);
      this.router.navigate(['/loadwindow']);
      setTimeout(() => {
        this.router.navigate(['/videocontent']);
      }, 8000);

      return null;
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status === 0) {
          return 'Network or server error. Please check your connection.';
        } else if (e.status === 401) {
          return 'Login failed. Please check your login details.';
        } else {
          return 'Login failed. Please check your login details.';
        }
      } else {
        return 'An unknown error has occurred. Please try again.';

      }
    }
  }
}
