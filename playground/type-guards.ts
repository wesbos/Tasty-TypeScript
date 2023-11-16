type Pizza = {
  toppings: string[];
  size: 'm' | 'l';
  name: string;
};

function displayValue(price: number | string) {
  if (typeof price === 'number') {
    price;
  }
}

function displayPizza(pizza: Pizza | string) {
  if('toppings' in pizza && pizza?.toppings?.length)
}

function handleResult(result: Pizza | Error) {
  if(result instanceof Error) {
    result.message
  }
}

function isPizza(maybePizza: any): maybePizza is Pizza {
  // You do the work to check if something is of a type
  if(maybePizza.toppings) return true;
  return false;
}

let someRandomThing: any;

if(isPizza(someRandomThing)) {
  someRandomThing; //
}


export {}
