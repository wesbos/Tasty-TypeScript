import { Sound } from '../sounds';

function generateAudioBlock(sound: Sound): string {
  return /* html */ `<div class="sound paused" id="${sound.id}">
    <button>${sound.name}</button>
    <img src="./icons/${sound.alt || sound.name}.svg" alt="${sound.name}">
    <audio src="${sound.url}" data-id="${
    sound.id
  }" controls loop preload="metadata"></audio>
  <input type="range" min="0" max="1" step="0.01" name="${sound.id}">
  </div>`;
}

export function createAudioHTML(sounds: Sound[]): string {
  return sounds.map((sound) => generateAudioBlock(sound)).join('');
}
