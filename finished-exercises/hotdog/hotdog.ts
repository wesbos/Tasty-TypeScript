import { imageClassifier } from 'ml5';
import { celebrate } from './fireworks';

const videoEl = document.querySelector<HTMLVideoElement>('video.webcam');
const canvasEl = document.querySelector<HTMLCanvasElement>('.still');
const ctx = canvasEl?.getContext('2d');
const videoSelect = document.querySelector<HTMLSelectElement>('select.camera');
const resultsEl = document.querySelector<HTMLDivElement>('.results');
const startStopButton =
  document.querySelector<HTMLButtonElement>('button.start-stop');

let classifier: ImageClassifier;

// When the model is loaded
async function setup() {
  classifier = await imageClassifier('MobileNet');
}

async function populateVideo(deviceId?: string) {
  const constraints = {
    video: deviceId ? { deviceId: { exact: deviceId } } : true,
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  if (!videoEl || !canvasEl) return;
  videoEl.srcObject = stream;
  await videoEl.play();
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;
}

async function populatecameras() {
  if (!videoSelect) return console.info('Missing Video Select');
  // skip this if we have cameras already
  if (videoSelect.childElementCount > 0) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter((device) => device.kind === 'videoinput');
  for (const camera of cameras) {
    const option = document.createElement('option');
    option.value = camera.deviceId;
    option.text = camera.label;
    videoSelect.appendChild(option);
  }
}

function handleCameraChange() {
  if (videoSelect) populateVideo(videoSelect.value);
}

async function checkForHotDog() {
  if (!ctx || !videoEl || !canvasEl) return;
  // paint to canvas
  ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
  const result: ImageClassifierResult[] = await classifier.classify(canvasEl);
  const oneResultMentionsHotDog = result.some((singleResult) =>
    singleResult.label.includes('hotdog')
  );
  if (oneResultMentionsHotDog) {
    celebrate();
    controls.stop();
    canvasEl.style.display = 'block';
  }
  displayResults(result);
}

function displayResults(results: ImageClassifierResult[]) {
  const resultsHTML = results
    .map(
      (result) => /* html */ `
    <div class="result">
      <div class="confidence" style="--confidence: ${
        result.confidence * 100
      }%"></div>
      <div class="label">${result.label}</div>
      </div>`
    )
    .join('');

  if (resultsEl) resultsEl.innerHTML = resultsHTML;
}

class Controls {
  private id: ReturnType<typeof setInterval> | undefined;

  public running = false;

  private functionToRun: (args: any) => any;

  frequency: number;

  constructor(functionToRun: (args: any) => any, frequency: number) {
    this.functionToRun = functionToRun;
    this.frequency = frequency;
  }

  start() {
    this.id = setInterval(this.functionToRun, this.frequency);
    this.running = true;
  }

  stop() {
    clearInterval(this.id);
    this.running = false;
  }

  toggle() {
    if (this.running) {
      this.stop();
    } else {
      this.start();
    }
  }
}

const controls = new Controls(checkForHotDog, 200);
videoSelect?.addEventListener('change', handleCameraChange);
videoEl?.addEventListener('loadedmetadata', populatecameras);
startStopButton?.addEventListener('click', controls.toggle.bind(controls));

populateVideo();
setup();
