import {
  createAudioHTML,
  handlePlayPause,
  handleVolumeChange,
  togglePlay,
  updateVolumeSlider,
} from './dom';
import { Mix, sounds, SingleMix } from './sounds';
import { delegate } from './utils/delegate';

const app = document.querySelector<HTMLDivElement>('.app');
if (!app) throw new Error('No app element found');
const soundsEl = app.querySelector('.sounds');
const restoreButton = app.querySelector<HTMLButtonElement>('.restoreMix');
const mixEl = app.querySelector<HTMLTextAreaElement>('textarea[name="mix"]');
const setMixEls = app.querySelectorAll('[data-mix]');

function init() {
  const soundsHTML = createAudioHTML(sounds);
  // here I won't specify that it's a div, because all Eleemnts take an innerHTML. No need, and then you can swtich it without stressin'
  if (!soundsEl) throw new Error('No sounds element found');
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
delegate(soundsEl, 'audio', 'volumechange', updateVolumeSlider, {
  capture: true,
});

// custom type guard to check if the json value is a legit mix
function isMix(mix: any): mix is Mix {
  // first check if its an array
  if (!Array.isArray(mix)) return false;
  // then we check if it has the right shape
  return mix.length > 0 && 'id' in mix[0] && 'volume' in mix[0];
}

restoreButton?.addEventListener('click', () => {
  // 1. Check for a local storage mix
  const localMix = localStorage.getItem('mix');
  if (!localMix) return; // nothing stored
  // 2. parse that mix
  const mix: unknown = JSON.parse(localMix);
  // here we narrow the type, by using a type guard
  if (isMix(mix)) {
    setMix(mix);
  }
});

Array.from(setMixEls).forEach((el) =>
  el.addEventListener('click', () => {
    const mix: unknown = JSON.parse((el as HTMLElement).dataset.mix || '');
    if (isMix(mix)) {
      setMix(mix);
    }
  })
);

function getMix(): Mix {
  if (!soundsEl) throw new Error('No sounds element found');
  // get all the audio elements on the page
  const audioEls = Array.from(soundsEl.querySelectorAll('audio'));
  const mix: Mix = audioEls
    // filter for only ones that are playing
    .filter((el) => !el.paused)
    // turn each into a SingleMix
    .map((el) => ({
      id: el.dataset.id || '',
      volume: el.volume,
    }));
  return mix;
}

function storeMix(): void {
  // store the mix, it can go anywhere! localStorage, the url, etc...
  const myMix = getMix();
  const JSONMix = JSON.stringify(myMix);
  localStorage.setItem('mix', JSONMix);
  if (mixEl) {
    mixEl.value = JSONMix;
  }
}

function pauseAll() {
  if (!soundsEl) throw new Error('No sounds element found');
  soundsEl.querySelectorAll('audio').forEach((el) => el.pause());
}

function setMix(mix: Mix): void {
  pauseAll();
  if (!soundsEl) throw new Error('No sounds element found');
  mix.forEach((singleMix: SingleMix) => {
    const el = soundsEl.querySelector<HTMLAudioElement>(
      `audio[data-id="${singleMix.id}"]`
    );
    if (!el) return;
    console.log(el);
    el.volume = singleMix.volume;
    el.play();
  });
}

init();
