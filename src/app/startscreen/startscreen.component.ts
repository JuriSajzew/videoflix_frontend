import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {

  constructor(
    private as: AuthService,
    private router: Router,
  ) { };

  logout() {
    this.as.LogOut();
    this.router.navigate(['/login']);

  }


}
