import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductById, addItemToCart } from '../services';

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

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: (data) => {
      console.log('Item added to cart:', data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Error adding item to cart:', error);
    },
  });
}
