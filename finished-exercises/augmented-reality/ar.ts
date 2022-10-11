import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';
import { codes } from './database';
// import QrScanner from 'qr-scanner';

declare global {
  interface Window {
    BarcodeDetector: typeof BarcodeDetectorPolyfill;
  }
}

try {
  window.BarcodeDetector.getSupportedFormats();
} catch {
  window.BarcodeDetector = BarcodeDetectorPolyfill;
}

const app = document.querySelector<HTMLDivElement>('.app');
if (!app) throw new Error('No app element found, aborting');
const videoEl = app.querySelector<HTMLVideoElement>('video.webcam');
const labelsEl = app.querySelector<HTMLDivElement>('.labels');
const cameraSwitcherEl = document.querySelector<HTMLSelectElement>(
  'select[name="camera"]'
);

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface CornerPoint {
  x: number;
  y: number;
}

export interface DetectedBarcode {
  boundingBox: BoundingBox;
  cornerPoints: CornerPoint[];
  format: string;
  rawValue: string;
}

const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });

async function populateVideo(cameraId?: string) {
  const constraints: MediaStreamConstraints = {};
  constraints.video = cameraId
    ? {
        deviceId: { exact: cameraId },
        height: { min: 576, ideal: 720, max: 1080 },
      }
    : true;

  const stream = await navigator.mediaDevices
    .getUserMedia(constraints)
    .catch(console.error);

  if (!stream || !videoEl) return;
  videoEl.srcObject = stream;
  videoEl.muted = true;
  await videoEl.play();
  setInterval(detectBarcodes, 100);
  populateCameras();
  // setInterval(paintToCanvas, 20);
}

async function detectBarcodes() {
  const results: DetectedBarcode[] = await barcodeDetector.detect(videoEl);
  results.forEach((result) => {
    // console.log('Detected barcode', result.rawValue);
    // console.table(result.cornerPoints);
    // console.table(result.boundingBox);
    const { x, y, width, height } = result.boundingBox;
    const centerPoint = {
      x: x + width / 2,
      y: y + height / 2,
    };

    const scaledCenterPoint = scaleCoordsToVideo(centerPoint.x, centerPoint.y);

    // console.table(result.cornerPoints);
    const [topLeft, topRight, bottomRight, bottomLeft] = result.cornerPoints;
    // select the label for this element
    const label = labelsEl.querySelector<HTMLSpanElement>(
      `[data-code="${result.rawValue}"]`
    );
    // label.style.width = `${width}px`;
    // label.style.height = `${height}px`;
    label.style.left = `${scaledCenterPoint.x}px`;
    label.style.top = `${scaledCenterPoint.y}px`;
  });
}

async function createLabels() {
  Object.values(codes).forEach((code) => {
    const el = document.createElement('span');
    el.classList.add('label');
    el.innerText = code.name;
    el.dataset.code = code.value.toString();
    labelsEl.appendChild(el);
  });
}

async function populateCameras() {
  // if there is a list of cameras already, don't bother
  if (cameraSwitcherEl.length) return;
  // get all devices
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.table(devices);
  // loopm over all video imputs and create an option for them
  devices
    .filter((d) => d.kind === 'videoinput')
    .forEach((device) => {
      const option = document.createElement('option');
      option.value = device.deviceId;
      option.innerText = device.label;
      cameraSwitcherEl.appendChild(option);
    });
}

function handleCameraChange() {
  populateVideo(cameraSwitcherEl.value);
}

function scaleCoordsToVideo(x: number, y: number) {
  const videoRect = videoEl.getBoundingClientRect();
  // videoRect.width / videoEl.videoWidth givies us a multiplier to scale the x and y coords. Say we have 1920 video, but it's being displayed at 500px wide. Then we will have 500 / 1920 = 0.2604166667. A point that used to be at 500, is now 500 * 0.2604166667.
  return {
    x: (x * videoRect.width) / videoEl.videoWidth,
    y: (y * videoRect.height) / videoEl.videoHeight,
  };
}

cameraSwitcherEl.addEventListener('change', handleCameraChange);

populateVideo();
createLabels();
