import { createAudioHTML,  handlePlayPause,  handleVolumeChange, togglePlay, updateVolumeSlider } from './dom';
import { Mix, sounds, SingleMix } from './sounds';
import { delegate } from './utils/delegate';

const app = document.querySelector<HTMLDivElement>('.app');
const soundsEl = app.querySelector('.sounds');
const restoreButton = app.querySelector<HTMLButtonElement>('.restoreMix');
const mixEl = app.querySelector<HTMLTextAreaElement>('textarea[name="mix"]');
const setMixEls = app.querySelectorAll('[data-mix]');

async function init() {
  const soundsHTML = createAudioHTML(sounds);
  // here I won't specify that it's a div, because all Eleemnts take an innerHTML. No need, and then you can swtich it without stressin'
  soundsEl.innerHTML = soundsHTML;
  // restoreMix();
}

delegate(soundsEl, 'input[type="range"]', 'input', handleVolumeChange);
delegate(soundsEl, 'button', 'click', togglePlay);
delegate(soundsEl, '.sound', 'click', togglePlay);
delegate(soundsEl, '.sound img', 'click', togglePlay);
delegate(soundsEl, 'audio', 'play', handlePlayPause, { capture: true });
delegate(soundsEl, 'audio', 'pause', handlePlayPause, { capture: true });
delegate(soundsEl, 'audio', 'play', storeMix, { capture: true });
delegate(soundsEl, 'audio', 'pause', storeMix, { capture: true });
delegate(soundsEl, 'audio', 'volumechange', storeMix, { capture: true });
delegate(soundsEl, 'audio', 'volumechange', updateVolumeSlider, { capture: true });
restoreButton.addEventListener('click', () => setMix(JSON.parse(localStorage.getItem('mix'))));

Array.from(setMixEls).forEach((el) => el.addEventListener('click', (e) => {
  const mix = JSON.parse((el as HTMLElement).dataset.mix);
  setMix(mix);
}));


function getMix(): Mix {
  // get all the audio elements on the page
  const audioEls = Array.from(soundsEl.querySelectorAll('audio'));
  const mix: Mix = audioEls
    // filter for only ones that are playing
    .filter(el => !el.paused)
    // turn each into a SingleMix
    .map(el => ({
      id: el.dataset.id,
      volume: el.volume
    }));
    return mix;
}

function storeMix(): void {
  // store the mix, it can go anywhere! localStorage, the url, etc...
  const myMix = getMix();
  const JSONMix = JSON.stringify(myMix);
  localStorage.setItem('mix', JSONMix);
  mixEl.value = JSONMix;
}

function pauseAll() {
  Array.from(soundsEl.querySelectorAll('audio')).forEach(el => el.pause());
}

function setMix(mix: Mix): void {
    pauseAll();
    mix.forEach((singleMix: SingleMix) => {
      const el = soundsEl.querySelector<HTMLAudioElement>(`audio[data-id="${singleMix.id}"]`);
      if(!el) return;
      console.log(el)
      el.volume = singleMix.volume;
      el.play();
    });

}

init();
