import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  constructor(private router: Router) { }

  logIn() {
    this.router.navigate(['/login']);
  }

  signUp(){
    this.router.navigate(['/signup']);
  }
}
