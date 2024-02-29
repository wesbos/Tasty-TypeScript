import { bands, Band } from '../test-data/bands';

// forEach
bands.forEach((band) => {
  console.log(band.members.at(1)?.instrument);
});

function logBand(band: Band) {
  console.log(band.name);
}
// map
const bandNames = bands.map((band): string | number => {
  if (band.name.startsWith('w')) return 777;
  return band.name;
});

// for of
for (const band of bands) {
  console.log(band);
}

const myObj = {
  name: 'john',
  age: 30,
  777: true,
};

const keys = Object.keys(myObj);
const values = Object.values(myObj);
const entries = Object.entries(myObj);

for (const [myKey, myVal] of Object.entries(myObj)) {
  console.log(myKey);
  console.log(myVal);
}
