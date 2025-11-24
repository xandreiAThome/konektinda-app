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

export async function addCart(variant_id: string, token: string) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/cart/items/${variant_id}`;
  console.debug('[addCart] POST', url);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      variant_id: variant_id,
      quantity: 1,
    }),
  });
  const raw = await res.text().catch(() => '');
  let data;
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { raw };
  }

  console.debug('[addCart] response status:', res.status, 'body:', data);

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || raw || 'Failed to add product';
    const error = new Error(message);
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  return { ...(data || {}), _statusCode: res.status };
}
