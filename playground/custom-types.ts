type PetFood = {
  name: string;
  treat: boolean;
};

type Dog = {
  name: string;
  age: number;
  readonly birthday: Date;
  lovesWalks?: boolean;
  favFood: PetFood;
};

interface Dog2 {
  name: string;
  age: number;
  birthday: Date;
}

const snickers: Dog = {
  age: 8,
  name: 'snickers',
  birthday: new Date(),
  favFood: {
    name: 'Scraps',
    treat: false,
  },
};

const burgers: PetFood = {
  name: 'Burgs!',
  treat: false,
};

const sunny: Dog = {
  age: 10,
  birthday: new Date(),
  name: 'sunny',
  favFood: burgers,
};

const sentence = `does he love Walks? ${snickers.lovesWalks ? 'YES!' : 'NO'}`;
