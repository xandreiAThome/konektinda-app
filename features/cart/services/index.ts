import { auth } from '../../../config/firebase';

export async function fetchCartProducts(token: string) {
  // Temporary 3 second delay to see loading UI

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/cart/items`, {
    method: 'GET', // Explicitly state it's a GET request
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 👈 Necessary for protected routes
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch cart');
  }
  return res.json();
}

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
}
