interface ShowInterface {
  title: string;
  showNumber: number;
  progress: number;
  playing: boolean;
  toggle: () => boolean;
}

class Show implements ShowInterface {
  progress: number = 0;

  playing: boolean = false;

  constructor(public title: string, public showNumber: number) {
    this.title = 'New Show';
    this.showNumber = 100;
  }

  toggle() {
    this.playing = !this.playing;
    return this.playing;
  }
}
