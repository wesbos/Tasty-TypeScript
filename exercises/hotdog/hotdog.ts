// Some element selection to get us going!
const videoEl = document.querySelector<HTMLVideoElement>('video.webcam');
const canvasEl = document.querySelector<HTMLCanvasElement>('.still');
const ctx = canvasEl?.getContext('2d');
const videoSelect = document.querySelector<HTMLSelectElement>('select.camera');
const resultsEl = document.querySelector<HTMLDivElement>('.results');
const startStopButton =
  document.querySelector<HTMLButtonElement>('button.start-stop');
