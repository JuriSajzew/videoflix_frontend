import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-forgot-password-reset',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FooterComponent
  ],
  templateUrl: './forgot-password-reset.component.html',
  styleUrl: './forgot-password-reset.component.scss'
})
export class ForgotPasswordResetComponent implements OnInit {
  token: string | null = null;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordFieldType: string = 'password';
  passwordError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Token aus der URL abrufen
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  validatePasswords(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match.';
    } else {
      this.passwordError = null;
    }
  }

  startlogIn() {
    this.router.navigate(['/login'])
  }

  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      return;
    }

    if (this.token) {
      this.http.post(environment.baseUrl + '/password_reset/confirm/', {
        token: this.token,
        password: this.newPassword
      }).subscribe(
        () => {
          console.error('Password reset successful!'),
          localStorage.clear();
        },
        error => console.error('Error resetting password. Please try again.')
      );
    } else {
      console.error('Invalid token!');
    }

    this.newPassword = '';
    this.confirmPassword = '';
    this.router.navigate(['/login']);
  }
}
