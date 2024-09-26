import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service/auth.service';
import { VideoService } from '../services/video.service/video.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VjsPlayerComponent } from "../vjs-player/vjs-player.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../services/auth.interceptor/auth-interceptor.service';

export interface Video {
  id: number;
  title: string;
  description: string;
  created_at: string;
  category: string;
  video_file: string;
  cover_image: string;
  video_urls:{
    [key: string]: string;
  }

}
@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [
    CommonModule,
    VjsPlayerComponent
  ],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class StartscreenComponent implements OnInit {

  allVideos: Video[] = [];
  documentaryVideos: Video[] = [];
  dramaVideos: Video[] = [];
  romanceVideos: Video[] = [];
  newVideos: Video[] = [];
  cover_image: Video[] = [];


  constructor(
    private as: AuthService,
    private router: Router,
    private videoService: VideoService,
  ) { };

  logout() {
    this.as.LogOut();
    this.router.navigate(['/login']);

  }

  async ngOnInit() {
    try {
      this.allVideos = await this.videoService.LoadAllVideos();
      console.log('Alle Videos ', this.allVideos);
      this.categorizeVideos();
      this.filterNewVideos();
    } catch (e) {
      console.error(e);
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
    twoDaysAgo.setDate(today.getDate() - 2);

    this.newVideos = this.allVideos.filter(video => {
      const createdAt = new Date(video.created_at);
      return createdAt >= twoDaysAgo;
    }).sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }

  getVideoSource(video: Video, quality: '480p' | '720p' | '1080p'): string {
    return video.video_urls[quality] || video.video_urls['720p']; // Fallback auf 720p
  }
}
