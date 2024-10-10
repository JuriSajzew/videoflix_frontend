import 'video.js';

declare module 'video.js' {
  interface VideoJsPlayer {
    dispose(): void;
  }
}

// Hier importieren wir das Plugin
declare module 'videojs-hotkeys' {
    export default function videojsHotkeys(player: videojs.Player): void;
  }