// att the at() method - this might not be needed at some point
declare global {
  interface ReadonlyArray<T> {
    at<R>(this: readonly [...any[], R], index: number): R;
  }
}

export interface BandMember {
  name: string;
  instrument: Instrument | Instrument[];
}

export interface Band {
  name: string;
  members: BandMember[];
}

const instruments = ['guitar', 'drums', 'bass', 'vocals', 'keys'] as const;
type Instrument = typeof instruments[number];
instruments.at(1); // no error!
// other methods still work
instruments.find((instrument) => instrument === 'drums');

// Heres an interesting one, we want the value of a union to be used as data.

export function getRandomItem<ItemType>(
  array: ItemType[],
  butNot?: ItemType
): ItemType {
  const randomItem = array[Math.floor(Math.random() * array.length)];
  // Stop it from returning the same item twice
  return randomItem === butNot ? getRandomItem(array, butNot) : randomItem;
}

function generateFunnyBandName(): string {
  const nouns = [
    'The Devil',
    'Cindy Patrick',
    'Johnny Jones',
    'Dog',
    'Sunshine',
    'A Full Moon',
    'High Water',
  ];
  const verbs = [
    'wears',
    'loves',
    'kills',
    'is',
    'will be',
    'eclipses',
    'destroys',
    'outruns',
    'needs',
  ];
  const nouns2 = [
    'it well',
    'the moon',
    'what we are waiting for',
    'who we wish we were',
    'the end of us',
    'a fake smile',
    'what we all want',
    'a rainy day',
  ];

  const noun1 = getRandomItem(nouns);
  const verb = getRandomItem(verbs);
  const noun2 = getRandomItem(nouns2, noun1);

  return `${noun1} ${verb} ${noun2}`;
}

function generateFakeName() {
  // A list of
  const firstNames = [
    'Wes',
    'Scott',
    'John',
    'Jane',
    'Mike',
    'Emily',
    'David',
    'Sarah',
    'Tom',
    'Lena',
    'Alex',
    'Olivia',
  ];
  const lastNames = [
    'Bos',
    'Doe',
    'Smith',
    'Jones',
    'Williams',
    'Brown',
    'Wilson',
    'Moore',
  ];
  const fakeName = `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
  return fakeName;
}

function generateBandMember(): BandMember {
  return {
    name: 'Mr',
    instrument: instruments.at(Math.random() * instruments.length),
  };
}

function generateBand(): Band {
  return {
    name: generateFunnyBandName(),
    members: Array.from({ length: Math.ceil(Math.random() * 10) }).map(() =>
      generateBandMember()
    ),
  };
}

export const bands: Band[] = Array.from({ length: 5 }, generateBand);
