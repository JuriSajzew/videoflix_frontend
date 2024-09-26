import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  onClose(){
    
  }
}
