function giveMeAString(): string {
  return 'hello';
}

function giveMeAStringAfter(ms: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hello'), ms);
  });
}

giveMeAStringAfter(200).then((result) => {
  console.log(result);
});

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

interface BlogPost {
  title: string;
  id: string;
  body: string;
  date: Date;
}

async function getPost(id: string): Promise<BlogPost> {
  await wait(200); // Mimick a network call
  return {
    body: 'Hello World',
    date: new Date(),
    id: 'abc123',
    title: 'Sweet Blog Post',
  };
}

const myBlogPost = await getPost('abc123');

type Episode = {
  number: number;
  title: string;
  date: number;
  url: string;
  slug: string;
  html: string;
  notesFile: string;
  displayDate: string;
  displayNumber: string;
};

async function getShow(showNumber: number): Promise<Episode> {
  const response = await fetch(`https://syntax.fm/api/shows/${showNumber}`);
  const show = (await response.json()) as Episode;
  return show;
}

async function fetchData<DataType>(
  resource: RequestInfo | URL,
  options?: RequestInit
): Promise<DataType> {
  const response = await fetch(resource, options);
  const data = (await response.json()) as DataType;
  return data;
}

const myDog = await fetchData<Dog>('https://dogz.net');

export {};
