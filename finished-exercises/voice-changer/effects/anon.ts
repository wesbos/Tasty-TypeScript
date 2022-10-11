// Based on https://voicechanger.io/transforms/anonymous.js

function makeDistortionCurve(amount: number) {
  var n_samples = 44100;
  var curve = new Float32Array(n_samples);
  var deg = Math.PI / 180;
  var x;
  for (let i = 0; i < n_samples; ++i) {
    x = i * 2 / n_samples - 1;
    curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

// TODO: This is a good use case for passing either a stream or an audio element, but not both

const outputAudioEl = document.querySelector<HTMLAudioElement>('.output');

export async function anonymousTransform(stream: HTMLAudioElement, distortionAmount = 15) {

  const ctx = new AudioContext();
  // Live Voice with a MediaStream object
  // const source = ctx.createMediaStreamSource(stream);
  // Pre-recorded because my family is wondering what i am doing
  const source = ctx.createMediaElementSource(stream);
  const destination = ctx.createMediaStreamDestination();

  outputAudioEl.srcObject = destination.stream;
  await outputAudioEl.play();

  // Wave shaper
  let waveShaper = ctx.createWaveShaper();

  waveShaper.curve = makeDistortionCurve(distortionAmount);

  // Wobble
  let oscillator = ctx.createOscillator();
  oscillator.frequency.value = 75;
  oscillator.type = 'sawtooth';
  oscillator.start(0);

  // Gain
  let gainNode = ctx.createGain();
  gainNode.gain.value = 0.0015;

  // Delay
  let delay = ctx.createDelay();
  delay.delayTime.value = 0.1;

  let longDelay = ctx.createDelay();
  longDelay.delayTime.value = 1;

  // Plug Everything into each other

  // Anon

  source.connect(delay);

  oscillator.connect(gainNode);
  gainNode.connect(delay.delayTime);
  delay.connect(longDelay);
  // waveShaper.connect(longDelay);
  longDelay.connect(ctx.destination)

}
