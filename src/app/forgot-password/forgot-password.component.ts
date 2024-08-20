import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ForgotPasswordService } from '../services/forgot.service/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  isEmailValid: boolean = false;
  errorMessage: string = '';
  validEmails: string[] = [];

  constructor(
    private fp: ForgotPasswordService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.fp.getEmails().subscribe(
      (emails: any[]) => {  // 'emails' ist ein Array von Objekten
        this.validEmails = emails.map(e => e.email);  // Extrahiere die E-Mails
      },
      (error) => {
        console.error('Fehler beim Laden der E-Mail-Adressen:', error);
      }
    );
  }

  checkEmail(): void {
    console.log('Eingegebene E-Mail:', this.email);
    console.log('Gültige E-Mails:', this.validEmails);
  
    // Normalisiere die E-Mails im validEmails Array zur Sicherheit
    const normalizedValidEmails = this.validEmails.map(email => email.trim().toLowerCase());
  
    this.isEmailValid = normalizedValidEmails.includes(this.email.trim().toLowerCase());
  
    console.log('Normalisierte gültige E-Mails:', normalizedValidEmails);
    console.log('Normalisierte eingegebene E-Mail:', this.email.trim().toLowerCase());
    console.log('Ist die E-Mail gültig?', this.isEmailValid);
  }

  forgotPassword() {
    if (this.isEmailValid) {
      this.fp.forgotPassword(this.email);
      this.email = '';
      this.router.navigateByUrl('/login');
    } else {
      this.errorMessage = 'Die eingegebene E-Mail-Adresse ist nicht registriert.';
    }
  }
}
