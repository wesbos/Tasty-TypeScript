/* eslint-disable max-classes-per-file  */
class Product {
  constructor(
    public type: string,
    public sku: string,
    private warehouseId: number
  ) {
    console.log('Created PRodcut');
  }

  /**
   * @deprecated
   */
  printLabel() {
    console.log(`Printing label for ${this.type} ${this.sku}`);
  }
}

const chair = new Product('chair', 'CHAIR123', 123);
chair.printLabel();

// A Function

/**
 * @deprecated This will be removed in the next version. Create a {@link Product} instead.
 * @description An example chair for testing
 */
const chair1 = { type: 'chair', sku: 'CHAIR123', warehouseId: 'WH123' };

console.log(chair);

class ProductNotFound extends Error {
  constructor(
    public readonly message: string,
    public readonly productId: string
  ) {
    super(message);
  }
}

/**
 * Description Anywhere!
 * @description Get a list of products.
 * @todo Migrate to new {@link Product} class.
 * @param category - The product category.
 * @param sort - The sort order. `ASC` most recent firstm `DESC` most recent last.
 * @fires {@link Product} When the product is created.
 * @throws {@link ProductNotFound} - if the product is not found.
 * @example ```ts
 * const products = getPromoProducts('123');
 * ```
 */
function getPromoProducts(category: string, sort?: 'ASC' | 'DESC') {}

try {
  getPromoProducts('123');
} catch (e) {
  const error = e as ProductNotFound;
}

export { Product, ProductNotFound, getPromoProducts };
