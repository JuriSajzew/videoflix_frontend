import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-hotkeys';

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
    controls?: boolean; // Füge die controls-Eigenschaft hinzu
    sources: {
      src: string,
      type: string,
    }[],
  } = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: false,
      controls: true,
      sources: []
    };

  player!: videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    if (this.target) {
      this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
        console.log('onPlayerReady', this);
      });
      // Plugin initialisieren
      this.player.hotkeys({
        enableModifiersForNumbers: false
      });

    } else {
      console.error('Target element is not available');
    }
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }



}
