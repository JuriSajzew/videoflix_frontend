import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;

  @Input() options: any;
  @Input() videoUrls: { [quality: string]: string } = {};
  @Output() qualityChange = new EventEmitter<string>();

  player!: videojs.Player;
  availableQualities: string[] = [];
  selectedQuality: string = '';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if (this.target) {
      this.player = videojs(this.target.nativeElement, this.options, () => {

        this.availableQualities = Object.keys(this.videoUrls);
        this.selectedQuality = this.availableQualities[0];

        const Button = videojs.getComponent('Button');
        class CustomButton extends Button {
          menu: HTMLElement;

          constructor(player: videojs.Player, options: any, availableQualities: string[], changeQualityCallback: (quality: string) => void) {
            super(player, options);

            this.addClass('vjs-my-custom-icon');
            this.el().setAttribute('aria-label', 'Quality');
            this.el().setAttribute('title', 'Quality');

            this.menu = document.createElement('div');
            this.menu.className = 'vjs-quality-menu';
            this.menu.style.display = 'none';

            const list = document.createElement('ul');
            list.className = 'vjs-quality-list';
            availableQualities.forEach(quality => {
              const item = document.createElement('li');
              item.textContent = quality;
              item.setAttribute('data-quality', quality);
              list.appendChild(item);
            });
            this.menu.appendChild(list);
            this.el().appendChild(this.menu);

            this.menu.addEventListener('click', (event: Event) => {
              const target = event.target as HTMLElement;
              const quality = target.getAttribute('data-quality');
              if (quality) {
                changeQualityCallback(quality);
              }
            });
          }

          override handleClick() {
            this.menu.style.display = this.menu.style.display === 'none' ? 'block' : 'none';
          }
        }

        const changeQuality = (quality: string) => {
          const sourceUrl = this.videoUrls[quality];

          if (sourceUrl) {
            this.player.src({ src: sourceUrl, type: 'application/x-mpegURL' });
            this.player.play();
            this.qualityChange.emit(quality);
          }
        };

        const controlBar = this.player.getChild('controlBar');
        let customButton: any;
        if (controlBar) {
          customButton = new CustomButton(this.player, {}, this.availableQualities, changeQuality);
          controlBar.addChild(customButton);
        } else {
          console.error('ControlBar not found.');
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
