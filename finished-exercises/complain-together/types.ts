export interface PageForms extends HTMLCollectionOf<HTMLFormElement> {
  prices: {
    currency: HTMLSelectElement;
    unit: HTMLSelectElement;
    currencyTo: HTMLSelectElement;
    unitTo: HTMLSelectElement;
    price: HTMLInputElement;
  } & HTMLFormElement;
}
