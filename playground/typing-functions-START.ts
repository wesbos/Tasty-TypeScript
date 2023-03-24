interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  tags: string[];
}

export interface Product extends CreateProductInput {
  created: Date;
  updated: Date;
}

type Person = {
  name: string;
  age: number;
};

interface Status {
  code: number;
  message: string;
}

type Toppings = 'Cheese' | 'Pepperoni' | 'Sausage' | 'Peppers' | 'Onions';

// 1. Type a named function declaration
function updateProduct(id: string): string {
  return `Product Updated: ${id}`;
}

updateProduct('abc123');

// 2. Type an anon function / function expression
const updatePerson = function (updates: Partial<Person>): Status {
  const p = { ...updates };
  return {
    code: 200,
    message: 'Person Has been updated',
  };
};

// 3. Type an arrow function
const UpdatePerson4 = (updates: Partial<Person>): Status => ({
  code: 200,
  message: '200',
});

type ChomFn = (count: number) => number;

const myChomper: ChomFn = (count) => count + 1;

// 4. Type an object method
interface Pizza {
  name: string;
  toppings: Toppings[];
  slices: number;
  chomp: (numberOfSlices: number) => number;
}

const pizza: Pizza = {
  name: 'Cheezy Tears',
  toppings: ['Cheese', 'Onions', 'Onions', 'Onions', 'Onions'],
  slices: 10,
  chomp(numberOfSlices) {
    return this.slices - numberOfSlices;
  },
};

// 5. Type a class Method
class Hamburger {
  toppings: string[] = [];

  addPatty(topping: string): string[] {
    this.toppings.push(topping);
    return this.toppings;
  }
}

// 6. A function that takes a function as an argument
const letters = ['a', 'b', 'c'];

type CallableMapFn = (a: string) => string;

function getLetters(mapFn: CallableMapFn) {
  const subset = letters.map(mapFn);
  return subset;
}
const x = getLetters((a) => 'hey');
const y = getLetters(() => {
  console.log('Working!!!');
  return 'Im a regular func';
});

type CallbackFn = (person: Person) => string;

function doStuff(callback: CallbackFn) {
  // do some work
  callback({
    age: 100,
    name: 'Wes',
  });
}

doStuff((person: Person) => {
  console.log('making a person');
  return `${person.name} is ${person.age}`;
});

doStuff((winner: Person) => {
  console.log('making a person');
  return `${winner.name} is the winner!`;
});

type ScoreFn = () => number;
function playGame(): ScoreFn {
  let score = 0;
  return function ScoreABasket(): number {
    score += 1;
    return score;
  };
}
const scoreAnother = playGame();
scoreAnother();
scoreAnother();
scoreAnother();
scoreAnother();
scoreAnother();
scoreAnother();

// 7. Typing destructured functions with external type
function sayHello({ name, age }: Person) {
  return `Hello ${name}. You are ${age} years old`;
}

// 8. Typing Destructured functions inline
function move(
  {
    direction,
    steps,
  }: {
    direction: 'up' | 'down';
    steps: number;
  } = {
    direction: 'down',
    steps: 5,
  }
) {
  return { x: 5, y: 5 };
}

type MoveArgs = {
  direction: 'up' | 'down';
  steps: number;
};

const defaultMoveArgs: MoveArgs = { direction: 'down', steps: 5 };

function move2({ direction, steps }: MoveArgs = defaultMoveArgs) {
  return { x: 5, y: 5 };
}

// 9. Typing optional Arguments
function sayHiTo(first: string, last?: string): string {
  return `Hey ${first} ${last || 'McCool'}`;
}

// 10. Inline arrow Implicit
document.body.addEventListener('mousemove', (event: MouseEvent) =>
  event.preventDefault()
);

// 11. Inline arrow explicit
document.body.addEventListener('mousemove', (event: MouseEvent): void =>
  event.preventDefault()
);

// 12. A function that returns nothing
function logInfo(info: string | number | Person): void {
  console.info(info);
  console.log('Hello');
}

export {};
