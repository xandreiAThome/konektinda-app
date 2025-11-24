export interface ProductVariant {
  product_variant_id: string;
  product_id: number;
  variant_name: string;
  stock: number;
  price: number;
  discount: number;
  is_active: boolean;
  product_variant_img: string;
  product: ProductName;
}

export interface ProductCategory {
  product_category_id: number;
  category_name: string;
}

export interface ProductName {
  product_name: string;
}

export interface Product {
  product_id: number;
  product_category_id: number;
  supplier_id: number;
  product_name: string;
  product_description?: string | null;
  is_active: boolean;
  category: ProductCategory;
  variants: ProductVariant[];
}

export interface ProductWithVariantAndCategory {
  variant: ProductVariant;
  product: Product;
  category: ProductCategory;
}

export interface NavItem {
  icon: string;
  label: string;
  // implement route: string;
}
