// as a type
type Food = {
  expiry: Date;
  name: string;
};

type Pizza = Food & {
  toppings: string[];
};

// With Interfaces
interface FoodInterface {
  expiry: Date;
  name: string;
}

interface PizzaInterface extends FoodInterface {
  toppings: string[];
}

const myPizza: Pizza = {
  toppings: ['pepperoni'],
  expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  name: 'Peppy Pig',
};

const myPizzaI: PizzaInterface = {
  toppings: ['pepperoni'],
  expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  name: 'Peppy Pig',
};

interface PizzaInterface2 extends Food {
  toppings: string[];
}

type PizzaType = PizzaInterface & {
  toppings: string[];
};
