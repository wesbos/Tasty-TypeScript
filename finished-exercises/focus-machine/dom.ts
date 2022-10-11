import { Sound } from './sounds';

/**
 *
 * @returns Audio Block HTML
 */
export function generateAudioBlock(sound: Sound): string {
    return /*html*/`
      <div class="sound paused" id="${sound.id}">
        <button>${sound.name}</button>
        <img src="./icons/${sound.alt || sound.name}.svg" alt="${sound.name}">
        <audio data-id="${sound.id}" src="${sound.url}" loop controls preload="metadata"></audio>
        <input name="${sound.id}" type="range" min="0" max="1" value="1" step="0.01">
      </div>
    `;
}


export function createAudioHTML(sounds: Sound[]): string {
  return sounds.map(sound => generateAudioBlock(sound)).join('');
}

export function handleVolumeChange(e: Event) {
  const rangeInput = e.target as HTMLInputElement;
  const audioEl = rangeInput.closest(`#${rangeInput.name}`).querySelector('audio');
  audioEl.volume = rangeInput.valueAsNumber;
}

export function togglePlay(e: Event) {
  const button = e.target as HTMLButtonElement;
  const audioEl = button.closest('.sound').querySelector('audio');
  if (audioEl.paused) {
    audioEl.play();
  }
  else {
    audioEl.pause();
  }
}
export function handlePlayPause(e: Event) {
  const el = e.target as HTMLAudioElement;
  const soundEl = el.closest('.sound');
  if(el.paused) {
    soundEl.classList.remove('playing');
    soundEl.classList.add('paused');
    return;
  }
  soundEl.classList.add('playing');
  soundEl.classList.remove('paused');
}

export function updateVolumeSlider(e: Event) {
  const audioEl = e.target as HTMLAudioElement;
  const rangeInput = document.querySelector<HTMLInputElement>(`[name="${audioEl.dataset.id}"]`);
  rangeInput.value = audioEl.volume.toString();
}

