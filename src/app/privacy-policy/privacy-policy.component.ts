import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service/auth.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  constructor(
    private router: Router,
  ) { };

  back() {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/videocontent']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
