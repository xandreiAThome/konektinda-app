export async function fetchAllSuppliers() {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/suppliers`);
  if (!res.ok) {
    throw new Error('Failed to fetch suppliers');
  }
  return res.json();
}

export async function fetchSupplierById(id: number) {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/suppliers/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch supplier');
  }
  return res.json();
}
