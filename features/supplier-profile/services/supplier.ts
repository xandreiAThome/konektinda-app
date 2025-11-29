// CRUCIAL: defining base URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// define expected structure of the supplier data
export interface SupplierProfile {
  supplier_id: number;
  supplier_name: string;
  supplier_description: string;
  products: number[]; // array of product IDs
  rating: number;
  location: string;
  dateJoined: string;
}

/* fetching complete data given supplier ID
    @param supplierId: the id of the supplier to fetch
    @returns promise to the SupplierProfile data
*/
export async function fetchSupplierProfile(supplierId: number): Promise<SupplierProfile> {
  const url = `${API_BASE_URL}/suppliers/${supplierId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // handle HTTP errors (404, 500, etc.)
      throw new Error(
        `Failed to fetch supplier profile: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error fetching supplier profile:', error);

    // re-throw error so the calling component can handle the failure state
    throw error;
  }
}
