const jokeButton = document.querySelector<HTMLButtonElement>('.getJoke');
if (!jokeButton) throw new Error('No Joke button found!');
const jokeButtonSpan = jokeButton.querySelector<HTMLSpanElement>('.jokeText');
const jokeHolder = document.querySelector<HTMLParagraphElement>('.joke p');
const loader = document.querySelector<HTMLDivElement>('.loader');

type JokeResponse = {
  id: string;
  joke: string;
  status: number;
};

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

function randomItemFromArray<Item>(arr: Item[], not: Item): Item {
  const item = arr.at(Math.random() * arr.length);
  if (item === not || !item) {
    console.log('😢 We used that one last time! Do it again');
    return randomItemFromArray(arr, not);
  }
  return item;
}

async function collect<T>(
  promise: Promise<T>
): Promise<[error: null, data: T] | [error: Error, data: null]> {
  try {
    const data = await promise;
    return [null, data]; // [null, User]
  } catch (err) {
    return [err as Error, null]; // [Error, null]
  }
}

// TODO: Handle error state
async function fetchJoke(): Promise<JokeResponse> {
  const response = (await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  }).then((res) => res.json())) as JokeResponse;

  return response;
}

export async function handleClick() {
  if (!jokeHolder || !jokeButtonSpan) {
    throw new Error('No joke! The element is not found!');
  }
  loader?.classList.remove('hidden');
  const [jokeFetchError, jokeResponse] = await collect(fetchJoke());
  let joke;
  if (jokeFetchError) {
    console.log('OH NO!!!!');
    joke =
      'Sorry, there was an error fetching the joke. Maybe you arent that funny';
  } else {
    joke = jokeResponse.joke;
  }

  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
  loader?.classList.add('hidden');
}

jokeButton.addEventListener('click', handleClick);
