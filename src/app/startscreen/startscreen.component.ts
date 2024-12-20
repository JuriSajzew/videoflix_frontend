import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service/auth.service';
import { VideoService } from '../services/video.service/video.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VjsPlayerComponent } from "../vjs-player/vjs-player.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../services/auth.interceptor/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VideoPlayerModalComponent } from '../video-player-modal/video-player-modal.component';

export interface Video {
  id: number;
  title: string;
  description: string;
  created_at: string;
  category: string;
  video_file: string;
  cover_image: string;
  loop: boolean,
  video_urls: {
    [quality: string]: string | '';
  }
  showDescription?: boolean;

}
@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [
    CommonModule,
    VjsPlayerComponent,
    FormsModule,
    FooterComponent,
    MatDialogModule,
  ],
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class StartscreenComponent implements OnInit {
  @ViewChild(VjsPlayerComponent, { static: false }) vjsPlayerComponent!: VjsPlayerComponent;
  allVideos: Video[] = [];
  documentaryVideos: Video[] = [];
  dramaVideos: Video[] = [];
  romanceVideos: Video[] = [];
  newVideos: Video[] = [];
  cover_image: Video[] = [];
  showVideoPlayer = false;
  hoveredVideo: number | null = null;

  selectedQuality: string = '720p';

  videoOptions = {
    fluid: true,
    aspectRatio: '16:9',
    autoplay: true,
    controls: true,
    poster: '/assets/breakout.png',
    sources: [
      { src: '/assets/Breakout.mp4', type: 'video/mp4' }
    ]
  };

  constructor(
    private as: AuthService,
    private router: Router,
    private videoService: VideoService,
    private dialog: MatDialog
  ) { };

  logout() {
    this.as.LogOut();
    this.router.navigate(['/login']);

  }

  async ngOnInit() {
    try {
      this.allVideos = await this.videoService.LoadAllVideos();

      this.allVideos = this.allVideos.map(video => ({
        ...video,
        showDescription: false // Setze die neue Eigenschaft auf false
      }));
      this.categorizeVideos();
      this.filterNewVideos();
    } catch (e) {
      console.error(e);
    }
  }

  onQualityChange(newQuality: string) {
    this.selectedQuality = newQuality;

    if (this.vjsPlayerComponent && this.vjsPlayerComponent.player) {
      this.vjsPlayerComponent.player.src({
        src: this.vjsPlayerComponent.videoUrls[newQuality],
        type: 'application/x-mpegURL'
      });
      this.vjsPlayerComponent.player.play();
    }
  }

  categorizeVideos(): void {
    this.documentaryVideos = this.allVideos.filter(video => video.category === 'documentary');
    this.dramaVideos = this.allVideos.filter(video => video.category === 'drama');
    this.romanceVideos = this.allVideos.filter(video => video.category === 'romance');
  }

  filterNewVideos(): void {
    const today = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 20);

    this.newVideos = this.allVideos.filter(video => {
      const createdAt = new Date(video.created_at);
      return createdAt >= twoDaysAgo;
    }).sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }

  onPlayClick() {
    this.dialog.open(VideoPlayerModalComponent, {
      panelClass: 'full-screen-dialog',
      data: {
        videoOptions: this.videoOptions,
        title: 'Breakout',
        description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.'
      }
    });
  }

  openVideoModal(video: Video) {
    const videoOptions = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: false, // Keine automatische Wiedergabe
      controls: true,
      poster: video.cover_image,
      sources: [{ src: video.video_urls[this.selectedQuality] || '', type: 'application/x-mpegURL' }]
    };

    this.dialog.open(VideoPlayerModalComponent, {
      panelClass: 'full-screen-dialog',
      data: {
        videoOptions: videoOptions,
        title: video.title,
        description: video.description
      }
    });
  }

  setHoveredVideo(videoId: number | null) {
    this.hoveredVideo = videoId;
  }

}
