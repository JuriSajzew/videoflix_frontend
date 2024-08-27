import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dialog-forgot-password',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './dialog-forgot-password.component.html',
  styleUrl: './dialog-forgot-password.component.scss'
})
export class DialogForgotPasswordComponent {

}
