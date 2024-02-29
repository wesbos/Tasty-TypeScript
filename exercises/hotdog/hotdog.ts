import { DetectedObject, load } from '@tensorflow-models/coco-ssd';
import { celebrate } from './celebrate';

type ObjectModel = Awaited<ReturnType<typeof load>>;
let model: ObjectModel;

// Some element selection to get us going!
const videoEl = document.querySelector<HTMLVideoElement>('video.webcam');
const canvasEl = document.querySelector<HTMLCanvasElement>('.still');
const ctx = canvasEl?.getContext('2d');
const videoSelect = document.querySelector<HTMLSelectElement>('select.camera');
const resultsEl = document.querySelector<HTMLDivElement>('.results');
const startStopButton =
  document.querySelector<HTMLButtonElement>('button.start-stop');

async function populateVideo(deviceId?: string) {
  type Constraints = Parameters<typeof navigator.mediaDevices.getUserMedia>[0];
  const constraints: Constraints = {
    video: deviceId ? { deviceId: { exact: deviceId } } : true,
  };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  if (!videoEl || !canvasEl) {
    console.log(`No video or canvas el found!`);
    return;
  }
  videoEl.srcObject = stream;
  await videoEl.play();
  canvasEl.width = videoEl?.videoWidth;
  canvasEl.height = videoEl?.videoHeight;
}

async function populateCameras() {
  if (!videoSelect) {
    return console.log('No video select found!');
  }
  // IF we have already run this, skip it
  if (videoSelect.childElementCount > 0) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter((device) => device.kind === 'videoinput');
  // Loop over each camera and add them to the select dropdown
  for (const camera of cameras) {
    const option = document.createElement('option');
    option.value = camera.deviceId;
    option.text = camera.label;
    videoSelect.appendChild(option);
  }
  console.log(devices);
}
function handleCameraChange() {
  if (videoSelect) {
    populateVideo(videoSelect.value);
  }
}

function displayResults(results: DetectedObject[]) {
  const resultsHtml = results
    .map(
      (result) => /* html */ `
    <div class="result">
      <div class="confidence" style="--confidence: ${result.score * 100}"></div>
      <div class="label">${result.class}</div>
    </div>
  `
    )
    .join('');
  if (resultsEl) resultsEl.innerHTML = resultsHtml;
}

async function checkForHotDog() {
  if (!videoEl) return;
  const results = await model.detect(videoEl);
  displayResults(results);
  // Check if any of the results includes a hot dog
  const oneResultMentionsHotDog = results.some((singleResult) =>
    singleResult.class.toLowerCase().includes('hot dog')
  );
  if (oneResultMentionsHotDog) {
    controls.stop();
    celebrate();
  }
}

async function start() {
  populateVideo();
  model = await load();
}

type AnyFunction = (args: any) => any;
class Controls {
  private id: ReturnType<typeof setInterval> | undefined;

  public running = false;

  private functionToRun: AnyFunction;

  frequency: number;

  constructor(functionToRun: AnyFunction, frequency: number) {
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

const controls = new Controls(checkForHotDog, 20);

// Event Listenrers
videoEl?.addEventListener('loadedmetadata', populateCameras);
videoSelect?.addEventListener('change', handleCameraChange);
startStopButton?.addEventListener('click', () => controls.toggle());

start();

export {};
