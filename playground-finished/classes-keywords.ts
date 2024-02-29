/* eslint-disable max-classes-per-file  */
type ProductType = 'chair' | 'table' | 'sofa';

class Product {
  // Product Type (public)
  public type: ProductType;

  // warehouseId (private)
  private warehouseId: string;

  #warehouseIdPrivate: string = 'ABC123';

  // sku (read only)
  readonly sku: string;

  // example (protected)
  protected cost: number;

  constructor(type: ProductType, sku: string, warehouseId: string) {
    console.log('Created PRodcut');
    this.type = type;
    this.warehouseId = warehouseId;
    this.sku = sku;
    this.cost = 100;
  }

  printLabel() {
    console.log(this.warehouseId);
    console.log(this.#warehouseIdPrivate);
  }
}

class PromoProduct extends Product {
  runPromo() {
    console.log(this.cost);
    console.log(this.warehouseId);
    console.log(this.#warehouseIdPrivate);
  }
}

const chair = new Product('chair', 'CHAIR123', 'WH123');
console.log(chair.type);
console.log(chair.type);
