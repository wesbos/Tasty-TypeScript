const jokeButton = document.querySelector<HTMLButtonElement>('.getJoke');
if (!jokeButton) throw new Error('No joke button found');
const jokeButtonSpan = jokeButton.querySelector<HTMLSpanElement>('.jokeText');
const jokeHolder = document.querySelector<HTMLParagraphElement>('.joke p');
const loader = document.querySelector<HTMLDivElement>('.loader');

interface Joke {
  id: string;
  joke: string;
  status: number;
}

const buttonText: string[] = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke(): Promise<Joke> {
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });
  return (await response.json()) as Joke;
}

async function getJoke(): Promise<Joke> {
  // turn loader on
  // Here we use ? because if loader is null, it doesnt break the app
  loader?.classList.remove('hidden');
  const JokeResponse = await fetchJoke();
  // turn the loader off
  loader?.classList.add('hidden');
  return JokeResponse;
}

function randomItemFromArray(arr: string[], not: string): string {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) {
    console.log('Ahh we used that one last time, look again');
    return randomItemFromArray(arr, not);
  }
  return item;
}

async function handleClick() {
  const { joke } = await getJoke();
  if (!jokeHolder || !jokeButtonSpan) throw new Error('No joke element found');
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent || ''
  );
}

jokeButton.addEventListener('click', handleClick);
