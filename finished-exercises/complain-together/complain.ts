import { convertUnits, currencies, CurrencyCode, Units } from './lib/convert';
import { formatMoney, getRates } from './lib/rates';
import { PageForms } from './types';
// 1. Normalize the price into CAD
// 1. Normalize the volume into L

// Go from there

const priceForm = (document.forms as PageForms).prices;
const currencySelect = priceForm.currency;
const currencyToSelect = priceForm.currencyTo;
const unitSelect = priceForm.unit;
const unitToSelect = priceForm.unitTo;
const priceInput = priceForm.price;
const displayValueEl = document.querySelector('mark.displayValue');

const units: Record<Units, string> = {
  gal: 'Gallon (US)',
  l: 'Liter',
  imperialGal: 'Gallon (UK)',
};

function populateSelect<SelectRecord extends Record<string, string>>(
  data: SelectRecord,
  el: HTMLSelectElement
): void {
  for (const [key, val] of Object.entries(data)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = val;
    el.appendChild(option);
  }
  // randomly select one
  const randomOption = el.children[
    Math.floor(Math.random() * el.children.length)
  ] as HTMLOptionElement;
  randomOption.selected = true;
}

async function handleFormChange() {
  // 1. Take the inputted price, currency and units
  const priceFrom = priceInput.valueAsNumber;
  const currencyFrom = currencySelect.value as CurrencyCode;
  const currencyTo = currencyToSelect.value as CurrencyCode;
  const unitFrom = unitSelect.value as Units;
  const unitTo = unitToSelect.value as Units;

  // Attempt 2
  // 1. Convert fromUnit to toUnit
  const toUnitValue = convertUnits(unitFrom, unitTo, 1);
  console.log(`${1} ${unitFrom} is ${toUnitValue} ${unitTo}`);
  // 2. Find price in fromCurrency/toUnit
  const priceInToUnit = priceFrom / toUnitValue;
  console.log(
    `${priceFrom} ${currencyFrom} / ${unitFrom} is ${priceInToUnit} ${currencyFrom} / ${unitTo}`
  );
  // 3.Convert price to toCurrency/toUnit
  const rates = await getRates(currencyFrom);
  const rate = rates[currencyTo];
  const finalPrice = priceInToUnit * rate;
  if (displayValueEl) {
    displayValueEl.textContent = formatMoney(finalPrice, currencyTo);
  }
}

function init() {
  populateSelect(currencies, currencySelect);
  populateSelect(currencies, currencyToSelect);
  populateSelect(units, unitSelect);
  populateSelect(units, unitToSelect);
  priceForm.addEventListener('input', handleFormChange);

  // trigger it on load
  handleFormChange();
}

init();
