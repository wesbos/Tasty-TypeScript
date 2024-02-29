type Shippers = 'UPS' | 'FedEx' | 'DHL';
type TrackingTypes = 'Overnight' | 'Priority' | 'Economy';

type ShippingMethod = `${Shippers}-${TrackingTypes}`;

type Shipment = {
  orderId: string;
  shippingMethod: ShippingMethod;
};

const myShipment: Shipment = {
  orderId: 'abc123',
  shippingMethod: 'FedEx-Overnight',
};

type ColorName =
  | 'red'
  | 'green'
  | 'purple'
  | 'pink'
  | 'blue'
  | 'orange'
  | 'yellow';

type Weights = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;

type Color = `${ColorName}-${Weights}`;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type PhoneNumber = `${Digit}${Digit}${Digit}-${Digit}`;

const myNumber: PhoneNumber = '000-0';
