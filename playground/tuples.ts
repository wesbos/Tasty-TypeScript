type Person = {
  name: string;
  age: number;
};

const people: Person[] = [
  { name: 'Wes', age: 1 },
  { name: 'Scott', age: 66 },
];

const scores: number[] = [1, 2, 3];
const scores2 = [1, 2, 3];

type PlayerStats = [name: string, age: number, cool: boolean];
const stats: PlayerStats = ['wes bos', 99, true];

const line = 'wesbos,99,true';
const [playerName, age, cool] = line.split(',');
const statsFromCSV: PlayerStats = [
  playerName,
  Number(age),
  cool.toLowerCase() === 'true',
];

type KeyValPair = [city: string, population: number];

const data: KeyValPair[] = [
  ['Hamilton', 2000],
  ['toronto', 50000],
];

const population = Object.fromEntries(data);

// Destructuring Tuples
function myState<StateType>(
  initialValue: StateType
): [StateType, (newState: StateType) => void] {
  let state = initialValue;
  function updateState(updatedValue: StateType) {
    state = updatedValue;
  }
  return [state, updateState];
}

const [myAge, setAge] = myState<number>(100);
console.log(myAge);
const [myName, updateName] = myState<string>('wes');
type Dog = {
  name: string;
  age: number;
};
const [dog, updateDog] = myState<Dog>({ name: 'snickers', age: 9 });

export {};
// Error / Response Tuples
// Branded Tuples
