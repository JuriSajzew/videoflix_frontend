import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service/auth.service';
import { SharedService } from '../services/shared.service/shared.service';
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    FooterComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  passwordFieldType: string = 'password';
  passwordError: string | null = null;
  emailaddress: string = '';
  registerError: string | null = null;
  showCard = false;
  errorMessage: string = '';
  loading: boolean = false;


  constructor(
    private router: Router,
    private as: AuthService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    const savedEmail = this.sharedService.getEmail();

    if (savedEmail) {
      this.emailaddress = savedEmail;
    } else {
      this.emailaddress = '';
    }
  }

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
    this.loading = true;

    const registrationData = {
      username: this.emailaddress,
      email: this.emailaddress,
      password: this.password
    };

    this.as.register(registrationData).subscribe({
      next: (response) => {
        this.loading = false;
        this.emailaddress = '',
          this.password = '',
          this.confirmPassword = '';
        this.errorMessage = 'Registration successful! Check your emails for verification!';
        this.showCard = true;
      },
      error: (error) => {
        this.loading = false;
        this.showCard = true;
        this.errorMessage = error;
        console.error('Registration failed', error);
      }
    });
  }

  closeCard() {
    this.showCard = false;
  }

}
