import { Currencies, currencies, CurrencyCode } from "./currencies";

const fromSelect = document.querySelector<HTMLSelectElement>('[name="from_currency"]');
const fromInput = document.querySelector<HTMLInputElement>('[name="from_amount"]');
const toSelect = document.querySelector<HTMLSelectElement>('[name="to_currency"]');
const toEl = document.querySelector<HTMLParagraphElement>('.to_amount');
const form = document.querySelector<HTMLFormElement>('.app form');
// These endpoints sometimes change, so if you are getting an error, check github to see if the endpoint has been updated!
const endpoint = 'https://api.frankfurter.app/latest';

type Rate = {
  [Property in CurrencyCode]?: number
}

type Rates = {
  [Property in CurrencyCode]?: Rate;
}

// This can't also be a Record because there is no way to make it optional
// type RateRecord = Record<CurrencyCode, number>;
// type RatesRecord = Record<CurrencyCode, Rate>;


type RateResponse = {
  base: CurrencyCode,
  rates: Rate
}
const ratesByBase: Rates = {};

function generateOptions(options: Currencies): string {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
    )
    .join('');
}

async function fetchRates(base = 'USD'): Promise<RateResponse> {
  const res = await fetch(`${endpoint}?base=${base}`);
  const ratesResponse = await res.json() as RateResponse;
  return ratesResponse;
}

async function convert(amount: number, from: CurrencyCode, to: CurrencyCode): Promise<number> {
  // first check if we even have the rates to convert from that currency
  if (!ratesByBase[from]) {
    console.log(
      `Oh no, we dont have ${from} to convert to ${to}. So gets go get it!`
    );
    const { rates } = await fetchRates(from);
    console.log(rates);
    // store them for next time
    ratesByBase[from] = rates;
  }
  // convert that amount that they passed it
  const rate = ratesByBase[from][to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}

function formatCurrency(amount: number, currency: CurrencyCode) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput() {
  const rawAmount = await convert(
    parseFloat(fromInput.value),
    fromSelect.value as CurrencyCode,
    toSelect.value as CurrencyCode
  );
  toEl.textContent = formatCurrency(rawAmount, toSelect.value as CurrencyCode);
}

const optionsHTML = generateOptions(currencies);
// populate the options elements
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener('input', handleInput);
