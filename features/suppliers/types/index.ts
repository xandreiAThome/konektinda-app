export interface Supplier {
  supplier_id: number;
  supplier_name: string;
  supplier_description?: string | null;
  products: any[];

  //need others to define in API website as it was not yet present
  rating?: number;
  location?: string;
  dateJoined?: string;
}
