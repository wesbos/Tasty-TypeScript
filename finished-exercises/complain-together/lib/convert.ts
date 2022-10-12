export const currencies = {
  USD: 'US Dollars',
  CAD: 'Canadian Dollar',
  EUR: 'Euro',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli Shekel',
  INR: 'Indian Rupee',
  ISK: 'Icelandic Krona',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
} as const;

export type Currency = typeof currencies;
export type CurrencyCode = keyof Currency;
export type Rates = { [CurrencyKey in CurrencyCode]: number };
export type RatesByCurrency = {
  [CurrencyKey in CurrencyCode]: Rates;
};
export type Units = 'imperialGal' | 'l' | 'gal';

export const rates = {
  // $1 CAD is. We fetch these rates from the API, but here we're just hardcoding them so we can visualize it
  CAD: 1,
  USD: 1.28,
  EUR: 1.13,
} as Rates; // Here we could use `as` because the rates are in from the API, its called initialData. We could also check for the rate to exist each time we use it.

const litreEquivalent: Record<Units, number> = {
  gal: 3.78541,
  l: 1,
  imperialGal: 4.54609,
};

export function convertUnits(
  fromUnit: Units,
  toUnit: Units,
  value: number
): number {
  // Expanded Logic folded
  // // first convert to litre
  // const litreValue = value * litreEquivalent[fromUnit];
  // console.log(`${value} ${fromUnit} is ${litreValue} L`);
  // // then convert to toUnit
  // const toUnitValue = litreValue / litreEquivalent[toUnit];
  // console.log(`${litreValue} L is ${toUnitValue} ${toUnit}`);
  return (value * litreEquivalent[fromUnit]) / litreEquivalent[toUnit];
}

// console.assert(convertUnits('gal', 'l', 1) === 3.78541, 'gal → l');
// console.assert(convertUnits('l', 'l', 1) === 1, 'l → l');
// console.assert(convertUnits('imperialGal', 'l', 1) === 4.54609, 'imperialGal → l');
// console.assert(convertUnits('l', 'gal', 1) === 0.26417217685798894, 'l → gal');
// console.assert(convertUnits('gal', 'gal', 1) === 1, 'gal → gal');
// console.assert(convertUnits('imperialGal', 'gal', 1) === 1.200950491492335, 'imperialGal → gal');
// console.assert(convertUnits('l', 'imperialGal', 1) === 0.21996924829908776, 'l → imperialGal');
// console.assert(convertUnits('gal', 'imperialGal', 1) === 0.8326737922038498, 'gal → imperialGal');
// console.assert(convertUnits('imperialGal', 'imperialGal', 1) === 1, 'imperialGal → imperialGal');

export function convertToCad(
  amount: number,
  baseCurrency: CurrencyCode
): number {
  return amount * rates[baseCurrency];
}

export function convertCurrency(
  toCurrency: CurrencyCode,
  amount: number
): number {
  return amount * (1 / rates[toCurrency]);
}

export function scalePriceToUnit(price: number, unit: Units): number {
  return price * litreEquivalent[unit];
}

// Returns the price per unit in CAD
export function convertPriceToLitres(
  cadAmount: number,
  baseUnit: Units
): number {
  /// 4.50 USD per gallon
  /// 5.76 CAD per gallon (coming in)
  /// 1.52 CAD per litre
  return cadAmount / litreEquivalent[baseUnit];
}
