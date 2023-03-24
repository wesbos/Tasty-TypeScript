// Task #1: Simple Types - Type these burgers

interface Burger {
  name: string;
  price: number;
  isVegan: boolean;
}

const cheeseBurg: Burger = {
  name: 'Bacon Cheeseburger',
  price: 5.99,
  isVegan: false,
};

const portabellaBurg: Burger = {
  name: 'Portabella Mushroom Burger',
  price: 6.99,
  isVegan: true,
};

// Task #2: Array Type - Type this array of podcasts

type Podcast = {
  name: string;
  url: string;
  description: string;
  episodes?: number;
};

const podcasts: Podcast[] = [
  {
    name: 'Syntax',
    url: 'https://syntax.fm/',
    description: 'A Tasty Treat for Web Developers',
    episodes: 300,
  },
  {
    name: 'Shop Talk Show',
    url: 'https://shoptalkshow.com/',
    description: 'A Web Design and Development Podcast',
  },
  {
    name: 'The Changelog',
    url: 'https://changelog.com/podcast',
    description: 'The Podcast for Developers',
  },
  {
    name: 'The Web Ahead',
    url: 'https://thewebahead.net/',
    description: 'A show about the future of the web',
  },
  {
    name: 'The Web Platform Podcast',
    url: 'https://thewebplatformpodcast.com/',
    description: 'A podcast about the open web platform',
  },
  {
    name: 'The Big Web Show',
    url: 'https://5by5.tv/bigwebshow',
    description: 'A weekly show about the big ideas in web development',
  },
];

// Task #3: Shoe Types - Type these shoes
type Shoe = {
  name: string;
  price: number;
  brand: 'Nike' | 'Adidas';
};
const shoes: Shoe[] = [
  {
    name: 'Nike Metcon 5',
    price: 130,
    brand: 'Nike',
  },
  {
    name: 'Nike Metcon 4',
    price: 130,
    brand: 'Nike',
  },
  {
    name: 'Nike Metcon 3',
    price: 130,
    brand: 'Nike',
  },
  {
    name: 'Nike Metcon 2',
    price: 130,
    brand: 'Nike',
  },
  {
    name: 'Nike Metcon 1',
    price: 130,
    brand: 'Nike',
  },
  {
    name: 'Nike Metcon DSX Flyknit 2',
    price: 150,
    brand: 'Nike',
  },
  {
    name: 'Nike Metcon Free',
    price: 150,
    brand: 'Nike',
  },
  {
    name: 'Nike Metcon 6',
    price: 150,
    brand: 'Adidas',
  },
];

// Task #4: Type this array of shoes with nested comments

interface Review {
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
}

type ShoeWithReview = {
  id: number;
  name: string;
  price: number;
  brand: string;
  reviews: Review[];
};

const shoes2: ShoeWithReview[] = [
  {
    id: 1,
    name: 'Nike Metcon 5',
    price: 130,
    brand: 'Nike',
    reviews: [
      {
        rating: 4,
        comment: 'This shoe is great!',
      },
      {
        rating: 5,
        comment: 'This shoe is amazing!',
      },
    ],
  },
  {
    id: 2,
    name: 'Nike Metcon 4',
    price: 130,
    brand: 'Nike',
    reviews: [
      {
        rating: 3,
        comment: 'This shoe is okay!',
      },
      {
        rating: 4,
        comment: 'This shoe is great!',
      },
    ],
  },
  {
    id: 3,
    name: 'Nike Metcon 3',
    price: 130,
    brand: 'Nike',
    reviews: [
      {
        rating: 1,
        comment: 'This shoe is terrible!',
      },
      {
        rating: 2,
        comment: 'This shoe is bad!',
      },
    ],
  },
  {
    id: 4,
    name: 'Nike Metcon 2',
    price: 130,
    brand: 'Nike',
    reviews: [
      {
        rating: 2,
        comment: 'This shoe is bad!',
      },
      {
        rating: 3,
        comment: 'This shoe is okay!',
      },
    ],
  },
  {
    id: 5,
    name: 'Nike Metcon 1',
    price: 130,
    brand: 'Nike',
    reviews: [
      {
        rating: 4,
        comment: 'This shoe is great!',
      },
      {
        rating: 5,
        comment: 'This shoe is amazing!',
      },
    ],
  },
];

// Task #5: Rice Dishes
type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

type Sauce = {
  name: string;
  ingredients: Ingredient[];
};

type Dish = {
  name: string;
  ingredients: Ingredient[];
  sauce: Sauce;
};

const riceDishes: Dish[] = [
  {
    name: 'Fried Rice',
    ingredients: [
      {
        name: 'rice',
        amount: 2,
        unit: 'cups',
      },
      {
        name: 'eggs',
        amount: 3,
        unit: 'large',
      },
      {
        name: 'soy sauce',
        amount: 0.25,
        unit: 'cup',
      },
      {
        name: 'green onion',
        amount: 0.5,
        unit: 'cup',
      },
    ],
    sauce: {
      name: 'soy sauce',
      ingredients: [
        {
          name: 'water',
          amount: 0.25,
          unit: 'cup',
        },
        {
          name: 'soy sauce',
          amount: 0.25,
          unit: 'cup',
        },
      ],
    },
  },
  {
    name: 'Rice and Beans',
    ingredients: [
      {
        name: 'rice',
        amount: 2,
        unit: 'cups',
      },
      {
        name: 'beans',
        amount: 2,
        unit: 'cups',
      },
      {
        name: 'soy sauce',
        amount: 0.25,
        unit: 'cup',
      },
      {
        name: 'green onion',
        amount: 0.5,
        unit: 'cup',
      },
    ],
    sauce: {
      name: 'soy sauce',
      ingredients: [
        {
          name: 'water',
          amount: 0.25,
          unit: 'cup',
        },
        {
          name: 'soy sauce',
          amount: 0.25,
          unit: 'cup',
        },
      ],
    },
  },
];

// Task #6: Hard Mode - the nested fav food are totally differnet. How would you type this? We haven't really learned about this yet!

type Pizza = {
  name: string;
  ingredients: string[];
  slices: number;
};

type Sushi = {
  title: string;
  fish: string;
  pieces: number;
};

type Employee = {
  name: string;
  twitter: string;
  favFood: Sushi | Pizza;
};

const employees: Employee[] = [
  {
    name: 'Wes Bos',
    twitter: '@wesbos',
    favFood: {
      name: 'Pepperoni Pizza',
      ingredients: ['dough', 'sauce', 'cheese', 'pepperoni'],
      slices: 8,
    },
  },
  {
    name: 'Scott Tolinski',
    twitter: '@stolinski',
    favFood: {
      title: 'Spicy Sushi',
      fish: 'Salmon',
      pieces: 12,
    },
  },
];

export {};
