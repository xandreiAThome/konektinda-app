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
