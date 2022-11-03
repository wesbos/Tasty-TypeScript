const name: string = 'wes';
const age: number = 100;
const isCool: boolean = true;

const isOld: boolean = age > 100;
const oldestAge: number = Math.max(200, 250);
const shouldCancel = window.confirm('Are you sure you want to exist?');

function confirm(message: string): boolean {
  return false;
}

function calculateBill(total: number, tip: number): string {
  const billTotal = total + tip;
  return `You owe ${billTotal}`;
}

const whatIsMyTotal = calculateBill(100, 20);

const names: string[] = ['wes', 'scott'];
const ages: number[] = [12, 54, 34];
const agesOrNames: (number | string)[] = [12, 54, 34, 'wes'];

export {};
