interface ParcelCreated {
  status: 'created';
}
interface ParcelShipped {
  status: 'shipped';
  location: string;
}
interface ParcelDelivered {
  status: 'delivered';
  pickupLocation: string;
}

type ParcelState = ParcelCreated | ParcelShipped | ParcelDelivered;
