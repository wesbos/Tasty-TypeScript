import { anonymousTransform } from "./effects/anon";

const appEl = document.querySelector<HTMLDivElement>('.voiceChanger');
const audioEl = appEl.querySelector<HTMLAudioElement>('audio');

async function init() {
  console.log('STarting');
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  });
  audioEl.srcObject = stream;
  await audioEl.play();

  const audioContext = new AudioContext();
  // TODO: This is a good use case for passing either a stream or an audio element, but not both
  // const audioSourceNode = audioContext.createMediaStreamSource(stream);
  // const audioSourceNode = audioContext.createMediaElementSource(audioEl);

  const anonNode = await anonymousTransform(audioEl);
}


init();
