export interface Weight {
  symbol: string,
  name: string,
  toKg: number
}

export const weights: Weight[] = [
  {
    symbol: 'g',
    name: "Grams",
    toKg: 0.001
  },
  {
    symbol: 'kg',
    name: "Kilograms",
    toKg: 1
  },
  {
    symbol: 'lbs',
    name: "Pounds",
    toKg: .453592
  },
  {
    symbol: 'ounces',
    name: "Ounces",
    toKg: .0283495
  },
  {
    symbol: 'stone',
    name: "Stone",
    toKg: 6.35029
  },
  {
    symbol: 'tonne',
    name: "Metric Tonne",
    toKg: 1000
  },
  {
    symbol: 'ton',
    name: "'Merica Ton 🇺🇸🇺🇸🇺🇸",
    toKg: 907.185
  },
];
