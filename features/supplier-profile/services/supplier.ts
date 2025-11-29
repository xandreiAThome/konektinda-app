// CRUCIAL: defining base URL
const API_BASE_URL = 'https://konektinda-backend.xandreiat.homes';

// define expected structure of the supplier data
export interface SupplierProfile {
  supplierId: number;
  name: string;
  rating: number;
  location: string;
  dateJoined: string;
  description: string;
  products: number[]; // array of product IDs
}

/* fetching complete data given supplier ID
    @param supplierId: the id of the supplier to fetch
    @returns promise to the SupplierProfile data
*/
export async function fetchSupplierProfile(supplierId: number): Promise<SupplierProfile> {
  const url = `${API_BASE_URL}/supplier/profile/${supplierId}`;

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
