import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductById } from '../services';

const QUERY_KEYS = {
  products: () => ['products'],
  product: (id: string) => ['product', id],
};

export function useProductsAll() {
  return useQuery({
    queryKey: QUERY_KEYS.products(),
    queryFn: fetchAllProducts,
    staleTime: 0, // Temporary: force refetch every time to see loading
    gcTime: 0, // Temporary: don't cache
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.product(id),
    queryFn: () => fetchProductById(id),
    staleTime: 0, // Temporary: force refetch every time to see loading
    gcTime: 0, // Temporary: don't cache
  });
}
