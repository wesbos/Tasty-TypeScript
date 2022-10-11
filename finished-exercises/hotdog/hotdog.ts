import ml5 from 'ml5';
import './fireworks';
import { celebrate } from './fireworks';
// Initialize the Image Classifier method with MobileNet

const videoEl = document.querySelector<HTMLVideoElement>('video.webcam');
const canvasEl = document.querySelector<HTMLCanvasElement>('.still');
const ctx = canvasEl.getContext('2d');
const videoSelect = document.querySelector<HTMLSelectElement>('select.camera');
const resultsEl = document.querySelector<HTMLDivElement>('.results');
const startStopButton = document.querySelector<HTMLButtonElement>('button.start-stop');

let classifier: ImageClassifier;

// When the model is loaded
async function setup() {
  classifier = await ml5.imageClassifier('MobileNet');
}

async function populateVideo(deviceId?: string  ) {

  const constraints = {
    video: deviceId ? { deviceId: { exact: deviceId } } : true
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  videoEl.srcObject = stream;
  await videoEl.play();
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;
}

async function populatecameras() {
  // skip this if we have cameras already
  if(videoSelect.childElementCount > 0) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices
    .filter((device) => device.kind === 'videoinput')
  for (const camera of cameras) {
    const option = document.createElement('option');
    option.value = camera.deviceId;
    option.text = camera.label;
    videoSelect.appendChild(option);
  }
}

async function handleCameraChange() {
  populateVideo(videoSelect.value);
}

async function checkForHotDog() {
  // paint to canvas
  ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
  const result: ImageClassifierResult[] = await classifier.classify(canvasEl);
  const oneResultMentionsHotDog = result.some(result => result.label.includes('hotdog'));
  if(oneResultMentionsHotDog) {
    celebrate();
    controls.stop();
    canvasEl.style.display = 'block';
  }
  displayResults(result);
}

async function displayResults(results: ImageClassifierResult[]) {
  const resultsHTML = results.map(result => /*html*/`
    <div class="result">
      <div class="confidence" style="--confidence: ${result.confidence * 100}%"></div>
      <div class="label">${result.label}</div>
      </div>`).join('');

  resultsEl.innerHTML = resultsHTML;

}

class Controls {
  private id:  ReturnType<typeof setInterval>;
  public running = false;
  private functionToRun: (args: any) => any;
  frequency: number;
  constructor(functionToRun: (args: any) => any, frequency: number) {
    this.functionToRun = functionToRun;
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
videoSelect.addEventListener('change', handleCameraChange);
videoEl.addEventListener('loadedmetadata', populatecameras);
startStopButton.addEventListener('click', controls.toggle.bind(controls));


populateVideo();
setup();
