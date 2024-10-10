import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from "../footer/footer.component";
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    FooterComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  showCard = false
  email: string = '';
  isEmailValid: boolean = false;
  errorMessage: string = '';
  validEmails: string[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  checkEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isEmailValid = emailPattern.test(this.email);
    console.log('Validierung Email:', this.isEmailValid);
  }

  startlogIn() {
    this.router.navigate(['/login'])
  }

  forgotPassword() {
    if (!this.isEmailValid) {
      this.errorMessage = 'Please enter a valid email address.';
      this.showCard = true;
      return;
    }

    this.http.post(environment.baseUrl + '/check_email/', { email: this.email }).pipe(
      switchMap(() => this.http.post(environment.baseUrl + '/password_reset/', { email: this.email })),
      catchError(error => {
        console.log(error.status)
        this.errorMessage = error.status === 404
          ? 'Send failed. Please check your Emailadress.'
          : 'An error occurred while sending the email. Please try again later.';
        console.log(this.errorMessage)
        this.showCard = true;
        return of(null);
      })
    ).subscribe(() => {
      if (!this.errorMessage) {
        this.showCard = true;
        this.errorMessage = 'An email has been sent with instructions to reset your password.';
      }
    });
  }

  closeCard() {
    this.showCard = false;
  }

  onClose() {

  }
}
