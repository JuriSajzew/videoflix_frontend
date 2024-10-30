import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service/auth.service';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  checked = false;
  password: string = '';
  passwordFieldType: string = 'password';
  isPasswordValid: boolean = false;
  showCard = false;
  errorMessage: string = '';
  loading: boolean = false;



  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private ls: LoginService,
  ) { }

  checkPassword() {
    const passwordPattern = /^.{8,}$/;
    this.isPasswordValid = passwordPattern.test(this.password);
  }

  async loginButton() {
    this.loading = true;
    const error = await this.ls.login(this.email, this.password);
    this.loading = false;

    if (error) {
      this.errorMessage = error;
      this.showCard = true;
    } else {

      this.showCard = false;
    }
  }

  closeCard() {
    this.showCard = false;
  }
}
