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
  { id: 'p1', brand: 'Palmolive', name: 'Creamy Milk Soap (150g)', price: 45.0 },
  { id: 'p2', brand: 'Safeguard', name: 'Anti-Bacterial Soap (65g)', price: 38.5 },
  { id: 'p3', brand: 'Dove', name: 'Moisturizing Cream Bar (100g)', price: 95.0 },
  { id: 'p4', brand: 'Calamansi Fresh', name: 'Natural Soap (120g)', price: 52.0 },
  { id: 'p5', brand: 'Likas Papaya', name: 'Papaya Whitening Soap (135g)', price: 48.75 },
  { id: 'p6', brand: 'Human Nature', name: 'Organic Bath Soap (150g)', price: 89.0 },
  { id: 'p7', brand: 'Nucifera', name: 'Coconut Oil Soap (125g)', price: 65.0 },
  { id: 'p8', brand: 'Belo Essentials', name: 'Whitening Soap (90g)', price: 55.5 },
];

// Mock data for the "Recently Purchased"
export const LAST_PURCHASED_PRODUCTS: Product[] = [
  { id: 'r1', brand: 'Lux', name: 'Soft Rose Soap (170g)', price: 72.0 },
  { id: 'r2', brand: 'Ivory', name: 'Pure & Gentle Soap (120g)', price: 68.0 },
  { id: 'r3', brand: 'Zest', name: 'Energizing Citrus Soap (100g)', price: 42.0 },
  { id: 'r4', brand: 'Carex', name: 'Anti-Bacterial Hand Soap (250ml)', price: 99.0 },
  { id: 'r5', brand: 'Mysore Sandal', name: 'Sandalwood Soap (150g)', price: 78.5 },
  { id: 'r6', brand: 'Herbal Care', name: 'Neem & Tulsi Soap (100g)', price: 56.0 },
  { id: 'r7', brand: 'Ponds', name: 'Detox Activated Charcoal Soap (125g)', price: 85.0 },
  { id: 'r8', brand: 'Sunsilk', name: 'Moisturizing Body Wash (200ml)', price: 120.0 },
];
