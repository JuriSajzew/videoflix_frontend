import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  password: string = '';
  confirmPassword: string = '';
  passwordFieldType: string = 'password';
  passwordError: string | null = null;


constructor(private router: Router){}

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
}
