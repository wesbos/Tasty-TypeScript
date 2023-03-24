const age = 10;
const age2: number = 10;

const name = 'wes';
const name2: string = 'wes';

const total = 10 + 10;

const areYouSure = window.confirm('Are ya sure?');
const yourName = prompt('what is your name?');
const welcome = `Hello ${yourName || 'Partner'}`;

const scores: number[] = [1, 2, 3, 4, 5];
scores.push(6);
scores.push(7);

function createPerson(firstName: string) {
  return {
    legs: 2,
    heads: 1,
    hair: 'blonde',
    name: firstName.toLowerCase(),
  };
}

const wes = createPerson('WES');

export {};
