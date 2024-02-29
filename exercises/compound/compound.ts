import { PaymentDueTime, fv } from 'financial';

// Custom Types
interface CompoundInputs {
  initial: HTMLInputElement;
  return: HTMLInputElement;
  duration: HTMLInputElement;
  contribution: HTMLInputElement;
  frequency: HTMLSelectElement;
}
type CompoundFormElement = HTMLFormElement & CompoundInputs;

type CompoundValues = {
  [Key in keyof CompoundInputs]: number;
};

type YearlyResult = {
  currentValue: number;
  year: number;
  contribution: number;
  profit: number;
};

// Selectors
const compoundForm = document.querySelector<CompoundFormElement>(
  'form[name="compound"]'
);

const resultsEl = document.querySelector<HTMLDivElement>('.results');

// Custom functionality
function getValues(): CompoundValues {
  if (!compoundForm) throw new Error('No Compound form found');
  return {
    initial: parseFloat(compoundForm.initial.value),
    return: parseFloat(compoundForm.return.value) / 100,
    duration: parseFloat(compoundForm.duration.value),
    contribution: parseFloat(compoundForm.contribution.value),
    frequency: parseFloat(compoundForm.frequency.value),
  };
}

function formatMoney(value: number): string {
  const formatter = new Intl.NumberFormat('en-CA', {
    currency: 'CAD',
    style: 'currency',
    maximumFractionDigits: value % 1 ? 2 : 0,
  });
  return formatter.format(value);
}

function getYearlyResults(): YearlyResult[] {
  const values = getValues();
  const yearsArray = Array.from({ length: values.duration }, (_, i) => i + 1);
  const futureValues = yearsArray.map((year): YearlyResult => {
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
    return {
      currentValue,
      contribution,
      profit,
      year,
    };
  });

  return futureValues;
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
      <div class="result" style="width: ${
        (result.currentValue / finalResult.currentValue) * 100
      }%; grid-template-columns: ${cWidth}% ${pWidth}%">
        <span class="contribution">${formatMoney(result.contribution)}</span>
        <span class="profit">${formatMoney(result.profit)}</span>
        <p class="yearlyBump green">+${formatMoney(
          prevResult
            ? result.currentValue - prevResult.currentValue
            : result.currentValue + result.profit
        )}</p>
      </div>
    </div>
  `;
}

function generateResultsHTML(results: YearlyResult[]): string {
  const finalResult = results.at(results.length - 1);
  if (!finalResult) {
    return `<p>There are not enough years to calculate this!</p>`;
  }
  return /* html */ `
    <div>
      <h2>You'll have ${formatMoney(finalResult.currentValue)} in ${
    results.length
  } years!</h2>
    <div class="years">
      ${results
        .map((result, index) =>
          generateSingleYearHTML(result, results[index - 1], finalResult)
        )
        .join('')}
    </div>
    </div>
  `;
}

function displayResults(): void {
  console.log('displaying the results!');
  const yearlyResults = getYearlyResults();
  if (!resultsEl) return;
  resultsEl.innerHTML = generateResultsHTML(yearlyResults);
}

// Event Listeners
compoundForm?.addEventListener('change', displayResults);
compoundForm?.addEventListener('input', displayResults);
