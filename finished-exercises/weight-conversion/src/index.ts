import { Weight, weights } from "./weights";

const form = document.querySelector<HTMLFormElement>('.convert form');
const from = form.querySelector<HTMLInputElement>('[name="fromValue"]');
const fromUnit = form.querySelector<HTMLSelectElement>('[name="fromUnit"]');
const to = form.querySelector<HTMLParagraphElement>('.toValue');
const toUnit = form.querySelector<HTMLSelectElement>('[name="toUnit"]');

type TriggerableTarget = HTMLInputElement & HTMLSelectElement;

const formatter = new Intl.NumberFormat(undefined,{
  maximumFractionDigits: 3, // max three decimal places
});

function generateOptions(weights: Weight[]): string {
  return weights
    .map(weight => /*html*/`
      <option value="${weight.symbol}">
        ${weight.name}
      </option>`)
    .join('')
}

function calculate(value: number, fromWeight: Weight, toWeight: Weight): WeightConversionResult {
  const kg = value * fromWeight.toKg;
  console.log(`${from.value} ${fromUnit.value} is ${kg} KG. Going to convert to ${toUnit.value}`);
  const toValue = kg / toWeight.toKg;
  console.log(`${toValue} ${toUnit.value}`)
  return {
    symbol: toWeight.symbol,
    name: toWeight.name,
    value: toValue
  }
}

function runChange(): void {
  // First convert to Kg
  const fromWeight = weights.find(weight => weight.symbol === fromUnit.value);
  const toWeight = weights.find(weight => weight.symbol === toUnit.value);
  const result = calculate(parseInt(from.value), fromWeight, toWeight);
  to.textContent = `${formatter.format(result.value)} ${result.symbol}`;
  console.log(result)
}

function randomize() {
  // create a random value
  from.value = `${Math.floor(Math.random() * 3200)}`;
  // get a random from option
  const randomFrom = fromUnit.children[Math.floor(Math.random() * fromUnit.children.length)] as HTMLOptionElement;
  randomFrom.selected = true;
  // get a random to option
  const randomTo = toUnit.children[Math.floor(Math.random() * toUnit.children.length)] as HTMLOptionElement;
  randomTo.selected = true;
  // trigger a change so it will run
  runChange();
}

function init(): void {
  // populate Options
  const weightOptions = generateOptions(weights);
  fromUnit.innerHTML = weightOptions;
  toUnit.innerHTML = weightOptions;
  // Add listeners
  form.addEventListener('change', runChange);
  randomize();
}

init();

