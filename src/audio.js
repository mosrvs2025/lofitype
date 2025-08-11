let audio;
let ui = null;

export function initAudio(controls) {
  ui = controls;
  audio = new Audio("/public/audio/track1.mp3");
  audio.loop = true;
  audio.preload = "auto";

  audio.addEventListener("error", () => {
    if (ui && ui.musicBtn) {
      ui.musicBtn.disabled = true;
      ui.musicBtn.title = "Add /public/audio/track1.mp3 to enable music.";
    }
  });
}

export function toggle() {
  if (!audio) return;
  if (audio.paused) audio.play();
  else audio.pause();
}

export function setVolume(v) { if (audio) audio.volume = v; }
export function isPlaying() { return audio && !audio.paused; }
