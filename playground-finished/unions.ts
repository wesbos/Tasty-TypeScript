type Status = 'picked-up' | 'shipped' | 'delivered';

type Product = {
  status: Status;
  id: string;
};

const myProduct: Product = {
  id: 'abc123',
  status: 'shipped',
};

myProduct.status = 'delivered';

type MediaElement = HTMLVideoElement | HTMLAudioElement;

const button = document.createElement('button');
function toggleMedia(element: MediaElement): void {
  if (element.paused) {
    element.play();
    button.textContent = 'Pause';
  } else {
    element.pause();
    button.textContent = 'Play';
  }
}

export {};
