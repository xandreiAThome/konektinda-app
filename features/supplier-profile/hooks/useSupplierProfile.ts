import { useState, useEffect } from 'react';
import { fetchSupplierProfile, SupplierProfile } from '../services/supplier';

// Define a simple return type for the hook
interface SupplierProfileHook {
  supplier: SupplierProfile | null;
  isLoading: boolean;
  isError: boolean;
}

/**
 * Fetches and manages the state for a single Supplier's Profile.
 * @param supplierId The ID of the supplier to fetch.
 */
export const useSupplierProfile = (supplierId: number | undefined): SupplierProfileHook => {
  const [supplier, setSupplier] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Only proceed if the ID is valid and not loading
    if (!supplierId) return;

    const loadSupplier = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchSupplierProfile(supplierId);
        setSupplier(data);
      } catch (error) {
        console.error('Failed to load supplier profile:', error);
        setIsError(true);
        setSupplier(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadSupplier();
  }, [supplierId]); // Rerun effect when supplierId changes

  return { supplier, isLoading, isError };
};
