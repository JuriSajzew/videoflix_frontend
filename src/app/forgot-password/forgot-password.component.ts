import { Component } from '@angular/core';
import { ForgotPasswordService } from '../services/forgot.service/forgot-password.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(
    private fp: ForgotPasswordService,
    private router: Router,
  ) { }

  forgotPassword() {
    this.fp.forgotPassword(this.email);
    this.email = '';
    this.router.navigateByUrl('/login');
  }
}
