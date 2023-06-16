import { delegate } from './delegate';
import { Mix, sounds } from './sounds';
import { createAudioHTML } from './utils/dom';

const soundsEl = document.querySelector<HTMLDivElement>('.sounds');
const mixEl = document.querySelector<HTMLTextAreaElement>(
  'textarea[name="mix"]'
);

const restoreButton = document.querySelector('.restoreMix');

function init() {
  console.log('STarting app...');
  const html = createAudioHTML(sounds);
  if (!soundsEl) throw new Error('Sound element not found!');
  soundsEl.innerHTML = html;
  delegate(soundsEl, 'input[type="range"]', 'input', handleVolumeChange);
  delegate(soundsEl, 'button', 'click', togglePlay);
  delegate(soundsEl, '.sound', 'click', togglePlay);
  delegate(soundsEl, '.sound img ', 'click', togglePlay);
  delegate(soundsEl, 'audio ', 'play', handlePlayPause, { capture: true });
  delegate(soundsEl, 'audio ', 'pause', handlePlayPause, { capture: true });
  delegate(soundsEl, 'audio ', 'play', setMix, { capture: true });
  delegate(soundsEl, 'audio ', 'pause', setMix, { capture: true });
  delegate(soundsEl, 'audio ', 'volumechange', setMix, { capture: true });
  delegate(soundsEl, 'audio ', 'volumechange', updateVolumeSlider, {
    capture: true,
  });
  restoreButton?.addEventListener('click', restoreMix);
}

function handleVolumeChange(e: Event) {
  const rangeInput = e.target as HTMLInputElement;
  const audioEl = rangeInput.closest('.sound')?.querySelector('audio');
  if (!rangeInput || !audioEl) return;
  console.log(rangeInput.value);
  audioEl.volume = rangeInput.valueAsNumber;
}

function updateVolumeSlider(e: Event) {
  const audioEl = e.target as HTMLAudioElement;
  const rangeInput = document.querySelector<HTMLInputElement>(
    `[name="${audioEl.dataset.id || ''}"]`
  );
  if (!rangeInput) {
    return console.info('No range input for this audio element found');
  }
  rangeInput.valueAsNumber = audioEl.volume;
}

function togglePlay(e: Event) {
  const el = e.target as HTMLAudioElement;
  const soundEl = el.closest('.sound');
  const audioEl = soundEl?.querySelector('audio');
  if (!audioEl) {
    throw new Error('No audio element found!');
  }
  if (audioEl.paused) {
    audioEl.play();
    soundEl?.classList.add('playing');
    soundEl?.classList.remove('paused');
  } else {
    audioEl.pause();
    soundEl?.classList.remove('playing');
    soundEl?.classList.add('paused');
  }
}

function handlePlayPause(e: Event) {
  console.log('PLAY OR PAUSE');
  const audioEl = e.target as HTMLAudioElement;
  const soundEl = audioEl.closest('.sound');
  if (!soundEl) return;
  if (audioEl.paused) {
    soundEl?.classList.remove('playing');
    soundEl?.classList.add('paused');
  } else {
    soundEl?.classList.add('playing');
    soundEl?.classList.remove('paused');
  }
}

function getMix(): Mix {
  if (!soundsEl) return [];
  // 1. Query all audio Elements
  const audioEls = Array.from(soundsEl.querySelectorAll('audio'));
  const mix: Mix = audioEls
    .filter((el) => !el.paused)
    .map((el) => ({
      id: el.dataset.id || '',
      volume: el.volume,
    }))
    .filter((singleMix) => singleMix.id);
  return mix;
}

function isMix(mix: unknown): mix is Mix {
  // In here, this is a custom type guard. We return true or false if it is of the Mix type
  if (!Array.isArray(mix)) return false; // if its not an array, its obvi not a mix
  // Check if the first item from the mix looks like adn feels like and smells like a mix
  /* eslint-disable-next-line */
  const firstItem = mix.at(0);
  return !!firstItem && 'id' in firstItem && 'volume' in firstItem;
}

function pauseAll() {
  const audioEls = soundsEl?.querySelectorAll('audio');
  if (!audioEls) return;
  for (const audio of audioEls) {
    audio.pause();
  }
}

function restoreMix() {
  // 1. Check localStorage
  const maybeMix = localStorage.getItem('mix');
  if (!maybeMix) return;
  const mixToRestore = JSON.parse(maybeMix) as unknown;
  if (isMix(mixToRestore)) {
    console.log(mixToRestore);
    // Pause All Audio
    pauseAll();
    for (const mix of mixToRestore) {
      const el = soundsEl?.querySelector<HTMLAudioElement>(
        `audio[data-id="${mix.id}"]`
      );
      if (!el) return;
      el.volume = mix.volume;
      el.play();
    }
  }
}

function setMix() {
  const mix = getMix();
  // STore in localStorage
  const mixString = JSON.stringify(mix);
  localStorage.setItem('mix', mixString);
  if (mixEl) mixEl.value = mixString;
}

init();
