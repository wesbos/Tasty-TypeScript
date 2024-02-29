const button = document.createElement('button');
const videoPlayer = document.querySelector<HTMLVideoElement>('.player');

if (videoPlayer) {
  videoPlayer.play();
}

button.addEventListener('click', handleEvent);

function handleEvent(e: MouseEvent) {
  const element = e.currentTarget;
  if (element instanceof HTMLButtonElement) {
    element.textContent = 'You clicked me';
  }
}

type User = {
  name: string;
  age: number;
};

function createUser() {
  let wes = {} as User;
  const user = localStorage.getItem('user');
  if (user) {
    wes = JSON.parse(user) as User;
  } else {
    wes = {
      name: 'Default',
      age: 0,
    };
  }
}

export {};
