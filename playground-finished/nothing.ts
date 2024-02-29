type Person = {
  name?: string;
  age: number | null;
};

const wes: Person = {
  age: 100,
};

wes.age = undefined;
wes.age = null;

function getIceCream() {
  return 'Chocolate';
}

const myIceCream = void (1 === 1);

async function goGetIceCream() {
  return 'ice cream';
}

const result = void goGetIceCream();

const people = [
  { name: 'wes', age: 100 },
  { name: 'Scott', age: 200 },
];

const person = people.find((per) => per.name === 'wes');
console.log(person.name);
if (person) {
  person.name.toUpperCase();
}
person.name.toUpperCase();

function failJSON(): never {
  console.log(`This JSON parse failed`);
  throw new Error('Shoot! JSON parse failed!');
}

const maybeJSON = 'sdlkfgjsdlkfgjldsfg';
try {
  const result = JSON.parse(maybeJSON);
  // ...
} catch (e) {
  failJSON();
}

// Inifinte Loop

function inifiteLoop(): never {
  while (true) {
    const result2 = prompt('Add number to DB?');
    console.log(`Saving to DB...`);
    // ...
  }
}

interface Basic {
  a: string;
}

interface WithB extends Basic {
  b: string;
  c?: never;
}

interface WithC extends Basic {
  b?: never;
  c: string;
}

function withLetter(letters: WithB | WithC) {
  return letters.a + letters.b + letters.c;
}

withLetter({
  a: 'A',
  b: 'b',
});
withLetter({
  a: 'A',
  c: 'c',
  b: 'b',
});

function doSomething(value: string | number) {
  if (typeof value === 'string') {
    console.log('ITS A STRING');
  } else if (typeof value === 'number') {
    console.log('ITS A number');
  } else {
    value;
  }
}

export {};
