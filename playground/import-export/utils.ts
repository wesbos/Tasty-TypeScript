export type Burger = {
  patties: number;
  lettuce: boolean;
};

export class User {
  constructor() {}
}

function connectDB() {
  console.log('Connecting to Database!');
}

connectDB();
