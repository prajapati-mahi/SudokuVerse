class SoundManager {
  constructor() {
    this.isSoundOn = true;
    this.isMusicOn = true;

    this.soundVolume = 1.0; // sound effects volume
    this.musicVolume = 0.4; // background music volume

    // Sound effects
    this.sounds = {
      click: new Audio("/sounds/click.wav"),
      correct: new Audio("/sounds/correct.wav"),
      error: new Audio("/sounds/error.wav"),
      win: new Audio("/sounds/win.wav"),
      lose: new Audio("/sounds/lose.wav"),
    };

    // Background music
    this.music = new Audio("/sounds/bgmusic.wav");
    this.music.loop = true;
    this.music.volume = this.musicVolume;
  }

  playSound(type) {
    if (!this.isSoundOn) return;

    const sound = this.sounds[type];
    if (!sound) return;

    sound.volume = this.soundVolume;
    sound.currentTime = 0;

    sound.play().catch((err) => {
      console.log("Sound blocked:", err);
    });
  }

  playMusic() {
    if (!this.isMusicOn) return;

    this.music.volume = this.musicVolume;

    this.music.play().catch((err) => {
      console.log("Music blocked:", err);
    });
  }

  stopMusic() {
    this.music.pause();
    this.music.currentTime = 0;
  }

  setSoundToggle(value) {
    this.isSoundOn = value;
  }

  setMusicToggle(value) {
    this.isMusicOn = value;

    if (!value) {
      this.stopMusic();
    }
  }

  setSoundVolume(value) {
    this.soundVolume = value;
  }

  setMusicVolume(value) {
    this.musicVolume = value;
    this.music.volume = value;
  }
}

export const soundManager = new SoundManager();
