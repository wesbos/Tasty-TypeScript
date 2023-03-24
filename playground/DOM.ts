const video = document.createElement('video');
video.src = 'dog.mp4';

const button = document.querySelector('button.go');

button?.addEventListener('click', handleClick);

function handleClick(event: Event) {
  console.log(event);
  console.log('click');
}

button?.addEventListener('click', (event) => {
  console.log(event);
});

function handlePosition(pos: GeolocationPosition) {
  console.log(pos.coords.speed);
}

function watchUser() {
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log('Sucecss');
  });
}
