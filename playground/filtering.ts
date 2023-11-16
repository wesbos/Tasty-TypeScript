type Dog = {
  name: string;
  barks: boolean;
};

type Cat = {
  name: string;
  meows: boolean;
};

type Pet = Dog | Cat;
const myPets: (Dog | Cat)[] = [
  { name: 'Rex', barks: true },
  { name: 'Fluffy', meows: true },
];

function isDog(pet: Pet): pet is Dog {
  return 'barks' in pet;
}

const myDogs = myPets.filter((pet): pet is Dog => 'barks' in pet);
// const myDogs = myPets.filter(isDog);

for (const dog of myDogs) {
  console.log(dog.barks);
}

const values = [1, 2, '3'];
const numbers = values.filter(
  (value): value is number => typeof value === 'number'
);

const myPromises = [
  fetch('https://wesbos.com'),
  fetch('https://api.github.com/user/wesbos'),
  fetch('https://brokenapi.net'),
];

const allResponses = await Promise.allSettled(myPromises);

const data = allResponses.filter(
  (response): response is PromiseFulfilledResult<Response> =>
    response.status === 'fulfilled'
);

data.forEach(async (response) => {
  const data = await response.value.json();
});

export {};
