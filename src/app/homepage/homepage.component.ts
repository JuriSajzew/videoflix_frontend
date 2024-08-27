import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service/shared.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  email: string = '';
  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) { }

  startlogIn() {
    this.router.navigate(['/login'])
  }

  startSignUp(email: string) {
    this.sharedService.setEmail(email);
    this.router.navigate(['/signup']);
  }
}
