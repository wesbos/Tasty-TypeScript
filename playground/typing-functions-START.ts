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
function updateProduct(id) {
  return `Product Updated: ${id}`;
}

updateProduct('abc123');

// 2. Type an anon function / function expression
const updatePerson = function (updates) {
  const p = { ...updates };
  return {
    code: 200,
    message: 'Person Has been updated',
  };
};

// 3. Type an arrow function
const UpdatePerson4 = (updates) => ({
  code: 200,
  message: '200',
});

const myChomper = (count) => count + 1;

// 4. Type an object method
const pizza = {
  name: 'Cheezy Tears',
  toppings: ['Cheese', 'Onions', 'Onions', 'Onions', 'Onions'],
  slices: 10,
  chomp(numberOfSlices) {
    return this.slices - numberOfSlices;
  },
};

// 5. Type a class Method
class Hamburger {
  constructor() {
    this.toppings = [];
  }

  addPatty(topping) {
    this.toppings.push(topping);
    return this.toppings;
  }
}

// 6. A function that takes a function as an argument
const letters = ['a', 'b', 'c'];

function getLetters(mapFn) {
  const subset = letters.map(mapFn);
  return subset;
}
const x = getLetters((a) => 'hey');

function doStuff(fn) {
  // do some work
  fn({
    age: 100,
    name: 'Wes',
  });
}

function playGame() {
  let score = 0;
  return function ScoreABasket() {
    score += 1;
    return score;
  };
}
const scoreAnother = playGame();

// 7. Typing destructured functions with external type
function sayHello({ name, age }) {
  return `Hello ${name}. You are ${age} years old`;
}

// 8. Typing Destructured functions inline
function move({ direction, steps }) {
  return { x: 5, y: 5 };
}

// 9. Typing optional Arguments
function sayHiTo(first, last) {
  return `Hey ${first} ${last || ''}`;
}

// 10. Inline arrow Implicit
document.body.addEventListener('mousemove', (event) => event.preventDefault());

// 11. Inline arrow explicit
document.body.addEventListener('mousemove', (event) => event.preventDefault());

// 12. A function that returns nothing
function logInfo(info) {
  console.info(info);
}

export {};
