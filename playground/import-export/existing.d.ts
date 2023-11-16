declare function calculateBill(total: number, tip: number, tax: number): number;

export interface User {
  name: string;
  age: number;
}

declare const user: User;

declare const TOTAL_PER_PAGE: number;

type MyCoolCompany = {
  showHelper: (selector?: string) => void;
};

declare global {
  interface Window {
    myCoolCompany: MyCoolCompany;
  }
}
