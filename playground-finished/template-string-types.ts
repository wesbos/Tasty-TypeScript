type Color = 'blue' | 'green' | 'red' | 'orange';
type Weight = 50 | 100 | 200 | 300 | 400;

type ColorWeight = `${Color}-${Weight}`;

const myValut: ColorWeight = '';

type Course = 'RFB' | 'TTS' | 'JS30';

type Product = `${Course}${1 | 2 | 3}`;

type Purchase = {
  name: string;
  amount: number;
  product: Product;
};

const myProduct: Purchase = {
  product: '',
};

type ShippingMethod = `${'UPS' | 'FedEx' | 'DHL'} - ${'OVERNIGHT' | 'ECONOMY'}`;

type InvoiceNumber = `INV-${string}`;
const myInvoice: InvoiceNumber = 'INV-1234';
const myInvoice2: InvoiceNumber = 'INV-1234';

export {};
