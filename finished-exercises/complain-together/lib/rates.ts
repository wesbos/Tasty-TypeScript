import { Rates, RatesByCurrency, CurrencyCode } from './convert';

type RateResponse = {
  amount: number;
  base: CurrencyCode;
  date: string;
  rates: Rates;
};

const rates = {} as RatesByCurrency;

export async function getRates(baseCurrency: CurrencyCode): Promise<Rates> {
  // First check if we have that cached
  if (rates[baseCurrency]) {
    console.log(`Using cached rates for ${baseCurrency}`);
    return rates[baseCurrency];
  }
  // otherr wise fetch the rates
  console.info(`Fetching rates for ${baseCurrency}`);
  const response = await fetch(
    `https://api.frankfurter.app/latest?base=${baseCurrency}`
  );
  const json = (await response.json()) as RateResponse;
  // cache them
  rates[baseCurrency] = json.rates;
  rates[baseCurrency][baseCurrency] = 1;
  return json.rates;
}

export function formatMoney(amount: number, currency: CurrencyCode): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
}
