import { useQuery } from '@tanstack/react-query';
import { fetchSupplierById, fetchAllSuppliers } from '../services/supplier';

const QUERY_KEYS = {
  suppliers: () => ['suppliers'],
  supplier: (id: number) => ['supplier', id],
};

export function useAllSuppliers() {
  return useQuery({
    queryKey: QUERY_KEYS.suppliers(),
    queryFn: fetchAllSuppliers,
    staleTime: 0, // Temporary: force refetch every time to see loading
    gcTime: 0, // Temporary: don't cache
  });
}

export function useSupplierById(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.supplier(id),
    queryFn: () => fetchSupplierById(id),
    staleTime: 0, // Temporary: force refetch every time to see loading
    gcTime: 0, // Temporary: don't cache
  });
}
