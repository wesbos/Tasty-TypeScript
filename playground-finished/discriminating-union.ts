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

interface ParcelLost {
  status: 'lost';
  message: string;
}

type ParcelState = ParcelCreated | ParcelShipped | ParcelDelivered | ParcelLost;

function notifyCustomer(parcel: ParcelState) {
  if (parcel.status === 'created') {
    console.log('your shipment is created');
  } else if (parcel.status === 'shipped') {
    console.log('your shipment is Shipped');
  } else if (parcel.status === 'delivered') {
    console.log('your shipment is Delivered');
  } else if (parcel.status === 'lost') {
    console.log('You are out of luck');
  } else {
    const thisSHouldNeverHappen: never = parcel;
  }
}

function notifyCustomer2(parcel: ParcelState) {
  switch (parcel.status) {
    case 'created': {
      console.log('your shipment is created');
      break;
    }
    case 'shipped': {
      console.log('your shipment is created');
      break;
    }
    case 'delivered': {
      console.log('your shipment is created');
      break;
    }
    case 'lost': {
      console.log('your shipment is created');
      break;
    }
    default: {
      console.log('This should never happen');
      const thisSHouldNeverHappen: never = parcel;
    }
  }
}
