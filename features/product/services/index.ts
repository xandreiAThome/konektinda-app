export async function fetchAllProducts() {
  // Temporary 3 second delay to see loading UI

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function fetchProductById(id: string) {
  // Temporary 2 second delay to see loading UI

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export interface CartItemInput {
  productVariantId: number;
  quantity: number;
}

export async function addItemToCart(item: CartItemInput) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/cart/items/${item.productVariantId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity: item.quantity }),
  });

  if (!res.ok) {
    throw new Error('Failed to add item to cart');
  }
  return res.json();
}
