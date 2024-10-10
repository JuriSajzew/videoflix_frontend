import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [],
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true })
  target!: ElementRef;

  // See options: https://videojs.com/guides/options
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    controls?: boolean;
    poster?: string,
    sources:
    { src: string, type: string }[],
  } = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: false,
      controls: true,
      sources: [],
    };

  player!: VideoJsPlayer;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    if (this.target) {
      this.player = videojs(this.target.nativeElement, this.options, () => {
        console.log('Player ist bereit');
      });
    }
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }



}
