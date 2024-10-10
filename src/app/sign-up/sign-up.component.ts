import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service/auth.service';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service/shared.service';
import { FooterComponent } from "../footer/footer.component";
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
    MatDialogModule,
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


  constructor(
    private router: Router,
    private as: AuthService,
    private dialog: MatDialog,
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

    console.log(this.emailaddress);

    const registrationData = {
      username: this.emailaddress,
      email: this.emailaddress,
      password: this.password
    };

    this.as.register(registrationData).subscribe({
      next: (response) => {
        this.emailaddress = '',
          this.password = '',
          this.confirmPassword = '';
        //this.dialog.open(DialogSignupComponent);
        this.errorMessage = 'Registration successful! Check your emails for verification!';
        this.showCard = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error: (error) => {
        this.showCard = true;
        this.errorMessage = error;
        console.log(this.errorMessage)
        console.error('Registration failed', error);
      }
    });
  }

  closeCard() {
    this.showCard = false;
  }

}
