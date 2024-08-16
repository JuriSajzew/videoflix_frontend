import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service/auth.service';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  password: string = '';
  confirmPassword: string = '';
  passwordFieldType: string = 'password';
  passwordError: string | null = null;
  emailaddress: string = '';
  registerError: string | null = null;


  constructor(
    private router: Router,
    private as: AuthService,
    private dialog: MatDialog,
  ) { }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  validatePasswords(): void {
    if (this.password !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match.';
    } else {
      this.passwordError = null;
    }
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.passwordError) {
      return;
    }

    const registrationData = {
      username: this.emailaddress,
      email: this.emailaddress,
      password: this.password
    };

    this.as.register(registrationData).subscribe({
      next: (response) => {
        this.emailaddress = '',
          this.password = '',
          this.dialog.open(DialogSignupComponent);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.registerError = 'Registration failed. Please try again.';
      }
    });
  }

}
