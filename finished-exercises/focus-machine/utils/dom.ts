import { Sound } from './sounds';

/**
 *
 * @returns Audio HTML String Fragment
 */
export function generateAudioBlock(sound: Sound): string {
  return /* html */ `
      <div class="sound paused" id="${sound.id}">
        <button>${sound.name}</button>
        <img src="./icons/${sound.alt || sound.name}.svg" alt="${sound.name}">
        <audio data-id="${sound.id}" src="${
    sound.url
  }" loop controls preload="metadata"></audio>
        <input name="${
          sound.id
        }" type="range" min="0" max="1" value="1" step="0.01">
      </div>
    `;
}

export function createAudioHTML(sounds: Sound[]): string {
  return sounds.map((sound) => generateAudioBlock(sound)).join('');
}

export function handleVolumeChange(e: Event) {
  const rangeInput = e.target as HTMLInputElement;
  if (!rangeInput) return;
  const audioEl = rangeInput
    .closest(`#${rangeInput.name}`)
    ?.querySelector('audio');
  if (!audioEl) throw new Error('No audio element found');
  audioEl.volume = rangeInput.valueAsNumber;
}

export function togglePlay(e: Event) {
  const button = e.target as HTMLButtonElement;
  const audioEl = button.closest('.sound')?.querySelector('audio');
  if (!audioEl) throw new Error('No audio element found');
  if (audioEl.paused) {
    audioEl.play();
  } else {
    audioEl.pause();
  }
}
export function handlePlayPause(e: Event) {
  const el = e.target as HTMLAudioElement;
  const soundEl = el.closest('.sound');
  if (!soundEl) throw new Error('No sound element found');
  if (el.paused) {
    soundEl.classList.remove('playing');
    soundEl.classList.add('paused');
    return;
  }
  soundEl.classList.add('playing');
  soundEl.classList.remove('paused');
}

export function updateVolumeSlider(e: Event) {
  const audioEl = e.target as HTMLAudioElement;
  const rangeInput = document.querySelector<HTMLInputElement>(
    `[name="${audioEl.dataset.id || ''}"]`
  );
  if (!rangeInput) throw new Error('No range input found');
  rangeInput.value = audioEl.volume.toString();
}
