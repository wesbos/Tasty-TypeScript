import { fv, PaymentDueTime } from 'financial';

interface CompoundFormElement extends HTMLFormElement {
  initial: HTMLInputElement;
  return: HTMLInputElement;
  duration: HTMLInputElement;
  contribution: HTMLInputElement;
  frequency: HTMLSelectElement;
}

interface YearlyResult {
  currentValue: number;
  year: number;
  contribution: number;
  profit: number;
}

interface CompoundValues {
  initial: number;
  return: number;
  duration: number;
  contribution: number;
  frequency: number;
}

const compoundForm = document.querySelector<CompoundFormElement>(
  'form[name="compound"]'
);
const resultsEl = document.querySelector<HTMLDivElement>('.results');

function getValues(): CompoundValues {
  if (!compoundForm) throw new Error('No compound form found');
  return {
    initial: parseFloat(compoundForm.initial.value),
    return: parseFloat(compoundForm.return.value) / 100,
    duration: parseInt(compoundForm.duration.value),
    contribution: parseInt(compoundForm.contribution.value),
    // Frequency of Contribution
    frequency: parseInt(compoundForm.frequency.value),
  };
}

function formatMoney(value: number): string {
  const formatter = new Intl.NumberFormat('en-CA', {
    currency: 'CAD',
    style: 'currency',
    // If the number of dollars is evenly divisible by 1
    // don't show any cents
    // otherwise show 2 decimal places
    maximumFractionDigits: value % 1 ? 2 : 0,
  });
  return formatter.format(value);
}

function getYearlyResults(): YearlyResult[] {
  const values = getValues();
  const yearsArray = Array.from({ length: values.duration }, (_, i) => i + 1);
  return yearsArray.map((year): YearlyResult => {
    const currentValue = fv(
      values.return / values.frequency,
      values.frequency * year,
      values.contribution * -1,
      values.initial * -1,
      PaymentDueTime.End
    );
    const contribution =
      values.contribution * values.frequency * year + values.initial;
    const profit = currentValue - contribution;
    return { currentValue, contribution, profit, year };
  });
}

function generateSingleYearHTML(
  result: YearlyResult,
  prevResult: YearlyResult,
  finalResult: YearlyResult
) {
  const cWidth = (result.contribution / result.currentValue) * 100;
  const pWidth = (result.profit / result.currentValue) * 100;
  return /* html */ `
    <div class="year">
      <p class="yearSummary">
        <span class="yearNumber">Year ${result.year}</span>
        <span class="yearValue">${formatMoney(result.currentValue)}</span>
      </p>
      <div
        class="result"
        style="width: ${
          (result.currentValue / finalResult.currentValue) * 100
        }%; grid-template-columns: ${cWidth}% ${pWidth}%"
      >
        <span class="contribution"> ${formatMoney(result.contribution)} </span>
        <span class="profit"> ${formatMoney(result.profit)} </span>
        <p class="yearlyBump green">
          +${formatMoney(
            prevResult
              ? result.currentValue - prevResult.currentValue
              : result.contribution + result.profit
          )}
        </p>
      </div>
    </div>
  `;
}

function generateResultsHTML(results: YearlyResult[]): string {
  const finalResult = results[results.length - 1];
  return /* html */ `
    <div>
      <h2>
        You'll have ${formatMoney(finalResult.currentValue)} in
        ${results.length} years!
      </h2>
      <div class="years">
        ${results
          .map((result, i) =>
            generateSingleYearHTML(result, results[i - 1], finalResult)
          )
          .join('')}
      </div>
    </div>
  `;
}

function displayResults(): void {
  if (!resultsEl) throw new Error('No results element found');
  console.log('Displaying results!');
  resultsEl.innerHTML = generateResultsHTML(getYearlyResults());
}

// trigger when the form changes
compoundForm?.addEventListener('change', displayResults);
// trigger on page load
displayResults();
