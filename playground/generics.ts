import { LatLng } from './tuples';

type Topping = 'Cheese' | 'Pepperoni' | 'Sausage' | 'Onions';

interface Pizza {
  toppings: Topping[];
  name: string;
}

type Condiment = 'Mayo' | 'Mustard' | 'Hot Sauce';

interface Sandwich {
  bread: 'White' | 'Rye' | 'Whole Wheat';
  condiments: Condiment[];
  main: 'Ham' | 'Avocado' | 'Roast Beef' | 'Tomtato';
}

type PreparedFood<FoodType> = FoodType & {
  expires: Date;
};

// const myPizza: PreparedFood<Pizza> = {
//   expires: new Date(),
//   name: 'Pepp',
//   toppings: ['Cheese', 'Pepperoni'],
// };

// const mySandwich: PreparedFood<Sandwich> = {
//   bread: 'Rye',
//   condiments: ['Mayo'],
//   expires: new Date(),
//   main: 'Avocado',
// };

function makeFood<FoodType>(food: FoodType): PreparedFood<FoodType> {
  return {
    ...food,
    expires: new Date(),
  };
}

const myPizza = makeFood<Pizza>({
  name: 'Hog Wild',
  toppings: ['Pepperoni', 'Sausage'],
});

interface Shoe {
  name: string;
  size: number;
}

interface Waterfall {
  location: [lat: number, lng: number];
  description: string;
  height: number;
}

function getSimilarItems<ItemType>(item: ItemType): ItemType[] {
  // find DB values..
  return [];
}

const similarShoes = getSimilarItems<Shoe>({ name: 'Dunks', size: 10 });
similarShoes.map((shoe) => shoe.name);
const similarWaterfalls = getSimilarItems<Waterfall>({
  location: [35, 234],
  description: 'cool waterfall',
  height: 100,
});
similarWaterfalls.map((fall) => fall.height);

// generic infer
// TODO: Make PreparedFood
function makeABunchOf<FoodType>(
  food: FoodType,
  howMany: number
): PreparedFood<FoodType>[] {
  const foodArray = Array.from({ length: howMany }, () => ({
    ...food,
    expires: new Date(),
  }));
  return foodArray;
}

const fridayPizza: Pizza = {
  name: 'Friday Pizza',
  toppings: ['Cheese', 'Onions'],
};

const fridaySandwich: Sandwich = {
  bread: 'White',
  condiments: ['Hot Sauce', 'Mustard'],
  main: 'Roast Beef',
};

const lotsOfPizzas = makeABunchOf<Pizza>(fridayPizza, 10);
const lotsOfPizzasInferred = makeABunchOf(fridayPizza, 10);
const lotsOfSandwichesInferred = makeABunchOf(fridaySandwich, 10);

export {};
