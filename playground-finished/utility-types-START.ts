type CreateProductInput = {
  name: string;
  price: number;
  description: string;
  tags: string[];
};

type Product = CreateProductInput & {
  created: Date;
  updated: Date;
};

interface ProductCategory {
  name: string;
  description: string;
  subcategories: ProductCategory[];
}

type TopLevelCategories = 'sports' | 'clothing' | 'outdoor' | 'kitchen';
type VariantBase = 'Mens' | 'Womens' | 'Kids';
type VariantSize = 'small' | 'medium' | 'large' | 'XL';
// Required

// Partial
// Pick
// Omit
// Exclude
// Non nullable
// ReadOnly
// Lowercase and Capitalize
// Record<>

export {};
