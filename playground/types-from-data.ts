const countries = ['CA', 'US', 'FR', 'SR', 'NL'] as const;
type Country = typeof countries[number];

function getFlagEmoji(countryCode: Country) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

getFlagEmoji('CA');
getFlagEmoji('NL');

const weights = {
  heavy: 900,
  light: 200,
} as const;

type Weights = typeof weights;
//    ^?
type WeightKey = keyof Weights;
//    ^?
type WeightValue = typeof weights[WeightKey];
//    ^?

function styleText(weight: WeightKey | WeightValue) {
  console.log('weight');
}

styleText('heavy');
styleText('light');
styleText(900);
styleText(weights.heavy);

const vehicles = [
  { name: 'Van', wheels: 4 },
  { name: 'Car', wheels: 4 },
  { name: 'Motorcycle', wheels: 2 },
] as const;

type Vehicle = {
  [Prop in keyof typeof vehicles[number]]: typeof vehicles[number][Prop];
};

export {};
