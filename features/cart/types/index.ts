export interface ProductVariant {
  is_active: boolean;
  product: Product;
  product_variant_img: string;
  variant_name: string;
}

export interface ProductImage {
  image_url: string;
}

export interface Product {
  product_name: string;
}

export interface CartItem {
  cart_item_id: String;
  cart_id: String;
  date_priced: Date;
  discount_applied: number;
  product_variant_id: number;
  quantity: number;
  unit_price: number;
  variant: ProductVariant;
}

export interface Cart {
  items: CartItem[];
}
