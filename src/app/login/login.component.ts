import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service/auth.service';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  checked = false;
  password: string = '';
  passwordFieldType: string = 'password';



  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(
    //private as: AuthService,
    private router: Router,
    private http: HttpClient,
    private ls: LoginService,
  ) { }

  loginButton() {
    this.ls.login(this.email, this.password);
    console.log('Name ', this.email);
    console.log('Pasword ', this.password);
  }
}
