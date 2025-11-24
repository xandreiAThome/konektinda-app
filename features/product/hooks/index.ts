import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductById, addCart } from '../services';
import { useAuthStore } from '../../auth/hooks/useAuthStore';

const QUERY_KEYS = {
  products: () => ['products'],
  product: (id: string) => ['product', id],
  product_variant: (id: string) => ['product_variant', id],
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

export function addToCart() {
  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async (variantId: string) => {
      if (!user) {
        throw new Error('You must be logged in to add items to the cart.');
      }
      const token = await user.getIdToken();

      return addCart(variantId, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
