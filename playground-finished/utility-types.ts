type CreateProductInput = {
  name: string;
  price: number;
  description: string;
  tags: string[];
};

type Product = CreateProductInput & {
  id: string;
  created: Date;
  updated: Date;
};

interface ProductCategory {
  name: string;
  description: string;
  subcategories: ProductCategory[];
}

// Partial
type ProductUpdate = Partial<Product>;

function updateProduct(id: string, updates: Partial<Product>) {
  // ...
}

updateProduct('abc123', {
  name: 'New UPdated Product Name',
});
// Required
type RequiredProduct = Required<ProductUpdate>;
// Pick
type DisplayProduct = Pick<Product, 'name' | 'price'>;
// Omit
type CreateProductInput2 = Omit<Product, 'id' | 'created' | 'updated'>;
function createProduct(input: CreateProductInput2) {}
// Exclude
type CatsWithoutKitch = Exclude<TopLevelCategories, 'kitchen'>;
type Dog = {
  barks: boolean;
};
type Cat = {
  meows: true;
  annoying: true;
  canKillYou: false;
};
type Tiger = {
  meows: boolean;
  canKillYou: true;
};
type Wolf = {
  canKillYou: true;
};
type Bird = {
  wings: number;
};
type Pets = Dog | Cat | Bird | Tiger | Wolf;
type SafePets = Exclude<Pets, { canKillYou: true }>;
// Non nullable
type El = NonNullable<ReturnType<typeof document.querySelector>>;

type ApplicationInit = {
  el: NonNullable<ReturnType<typeof document.querySelector>>;
};
// ReadOnly
type LockedProduct = Readonly<Product>;
// Lowercase and Capitalize
type TopLevelCategories = 'sports' | 'clothing' | 'outdoor' | 'kitchen';
type VariantBase = 'Mens' | 'Womens' | 'Kids';
type VariantSize = 'small' | 'medium' | 'large' | 'XL';

type Variants = `${Lowercase<VariantBase>}-${Lowercase<VariantSize>}`;
// Record<>
type ProductListing = Partial<Record<VariantSize, Product>>;

const myListing: ProductListing = {
  large: {
    name: 'Cool Shoes',
    created: new Date(),
  },
};

type ProductListingManual = {
  [key in VariantSize]: Product;
};

type Stream = Awaited<ReturnType<typeof navigator.mediaDevices.getUserMedia>>;
type Params = NonNullable<
  Parameters<typeof navigator.mediaDevices.getUserMedia>[0]
>;

async function go() {
  const stream = await navigator.mediaDevices.getUserMedia();
}

function getPodcastList() {
  return [
    { name: 'Syntax', url: 'syntax.fm', social: '@syntaxfm' },
    { name: 'Shoptalk Show', url: 'ShoptalkShow.com' },
  ];
}

type Podcast = ReturnType<typeof getPodcastList>[0];

export {};
