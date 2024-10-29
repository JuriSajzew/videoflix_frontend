import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { VjsPlayerComponent } from '../vjs-player/vjs-player.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-video-player-modal',
  standalone: true,
  imports: [
    VjsPlayerComponent, 
    MatDialogContent,
    MatIconModule,
  ],
  templateUrl: './video-player-modal.component.html',
  styleUrl: './video-player-modal.component.scss'
})
export class VideoPlayerModalComponent {
  videoOptions: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VideoPlayerModalComponent>) {
    this.videoOptions = data.videoOptions;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
