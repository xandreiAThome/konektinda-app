import { auth } from '../../../config/firebase';

export interface CartItemInput {
  productVariantId: number;
  quantity: number;
}

export async function addItemToCart(item: CartItemInput) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/cart/items/${item.productVariantId}`;

  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity: item.quantity }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('API Error:', res.status, errorText);
    throw new Error('Failed to add item to cart');
  }
  return res.json();
}

export async function fetchCartItems() {
  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/cart/items`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch cart items');
  return res.json();
}

export async function updateCartItem(item: CartItemInput) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/cart/items/${item.productVariantId}`;

  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify({ quantity: item.quantity }),
  });

  if (!res.ok) throw new Error('Failed to update cart item');
  return res.json();
}
