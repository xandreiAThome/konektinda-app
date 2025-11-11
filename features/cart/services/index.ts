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
