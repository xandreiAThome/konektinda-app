export async function fetchAllProducts() {
  // Temporary 3 second delay to see loading UI

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/product-variants`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function fetchProductById(id: string) {
  // Temporary 2 second delay to see loading UI

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/product-variants/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}
