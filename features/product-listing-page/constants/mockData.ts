// Defines the type for a product
export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  imageUrl?: string; // Optional image URL
};

// Mock data for the "Most Popular Items"
export const MOST_POPULAR_PRODUCTS: Product[] = [
  { id: 'p1', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'p2', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'p3', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'p4', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'p5', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'p6', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
];

// Mock data for the "Recently Purchased"
export const LAST_PURCHASED_PRODUCTS: Product[] = [
  { id: 'r1', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'r2', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'r3', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
  { id: 'r4', brand: 'BRAND NAME', name: 'Product Name (000ml)', price: 100.00 },
];